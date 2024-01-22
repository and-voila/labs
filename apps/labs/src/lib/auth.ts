import { env } from '#/env';

import type { NextAuthOptions } from 'next-auth';

import { PrismaAdapter } from '@next-auth/prisma-adapter';
import DiscordProvider from 'next-auth/providers/discord';
import EmailProvider from 'next-auth/providers/email';
import GoogleProvider from 'next-auth/providers/google';

import { db } from '#/lib/db';
import { createPersonalTeam } from '#/lib/operations/user/create-personal-team';
import { generateUniqueDisplayName } from '#/lib/operations/user/generate-unique-display-name';
import { getSession } from '#/lib/operations/user/session';
import { sendVerificationRequest } from '#/lib/resend/send-verification-request';
import { sendWelcomeEmail } from '#/lib/resend/send-welcome-email';

const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL;

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
  cookies: {
    sessionToken: {
      name: `${VERCEL_DEPLOYMENT ? '__Secure-' : ''}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        // When working on localhost, the cookie domain must be omitted entirely (https://stackoverflow.com/a/1188145)
        domain: VERCEL_DEPLOYMENT
          ? `.${env.NEXT_PUBLIC_ROOT_DOMAIN}`
          : undefined,
        secure: VERCEL_DEPLOYMENT,
      },
    },
  },
  pages: {
    signIn: '/login',
    verifyRequest: '/login',
    error: '/login',
  },
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
      profile(profile) {
        return {
          id: profile.id,
          name: profile.username,
          email: profile.email,
          image: profile.avatar
            ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`
            : null,
          discordId: profile.id,
          discordUsername: `${profile.username}#${profile.discriminator}`,
          discordAvatar: profile.avatar,
        };
      },
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    EmailProvider({
      sendVerificationRequest,
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.displayName = token.displayName as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (!dbUser) {
        if (user) {
          token.id = user?.id;
        }
        return token;
      }

      if (!dbUser.displayName) {
        const uniqueUsername = await generateUniqueDisplayName();
        await db.user.update({
          where: { id: dbUser.id },
          data: { displayName: uniqueUsername },
        });
        token.displayName = uniqueUsername;
      } else {
        token.displayName = dbUser.displayName;
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { team, isNew } = await createPersonalTeam(dbUser.id);
      if (isNew) {
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        displayName: token.displayName,
      };
    },
  },
  events: {
    async createUser(message) {
      if (message.user?.email) {
        const email = message.user.email;
        if (typeof email === 'string') {
          setTimeout(
            () => {
              sendWelcomeEmail({ email });
            },
            3 * 60 * 1000,
          );
        }
      }
    },
  },
  // debug: process.env.NODE_ENV !== "production"
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withSiteAuth(action: any) {
  return async (
    formData: FormData | null,
    siteId: string,
    key: string | null,
  ) => {
    const session = await getSession();
    if (!session) {
      return {
        error: 'Not authenticated',
      };
    }
    const site = await db.site.findUnique({
      where: {
        id: siteId,
      },
    });
    if (!site?.teamId) {
      return {
        error: 'Site not found',
      };
    }
    const membership = await db.membership.findUnique({
      where: {
        userId_teamId: {
          userId: session.user.id,
          teamId: site.teamId,
        },
      },
    });
    if (!membership) {
      return {
        error: 'Not authorized',
      };
    }
    return action(formData, site, key);
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withPostAuth(action: any) {
  return async (
    formData: FormData | null,
    postId: string,
    key: string | null,
  ) => {
    const session = await getSession();
    if (!session?.user?.id) {
      return {
        error: 'Not authenticated',
      };
    }
    const post = await db.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        site: true,
      },
    });
    if (!post || !post.site?.teamId) {
      return {
        error: 'Post or site not found',
      };
    }
    const membership = await db.membership.findFirst({
      where: {
        userId: session.user.id,
        teamId: post.site.teamId,
      },
    });
    if (!membership) {
      return {
        error: 'Not authorized',
      };
    }

    return action(formData, post, key);
  };
}
