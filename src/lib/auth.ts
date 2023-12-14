import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import EmailProvider from 'next-auth/providers/email';
import GoogleProvider from 'next-auth/providers/google';

import { env } from ':/env.mjs';

import { db } from '#/lib/db';
import { generateUniqueDisplayName } from '#/lib/generate-unique-display-name';
import { sendVerificationRequest } from '#/lib/resend/send-verification-request';
import { sendWelcomeEmail } from '#/lib/resend/send-welcome-email';
import { getSession } from '#/lib/session';

import { createPersonalTeam } from '#/app/(routes)/app/(dashboard)/team/new/actions';

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
          ? `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
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
      clientId: env.DISCORD_CLIENT_ID as string,
      clientSecret: env.DISCORD_CLIENT_SECRET as string,
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
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
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
    if (!site || site.userId !== session.user.id) {
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
    if (!session?.user.id) {
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
    if (!post || post.userId !== session.user.id) {
      return {
        error: 'Post not found',
      };
    }

    return action(formData, post, key);
  };
}
