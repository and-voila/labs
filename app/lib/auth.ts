import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import EmailProvider from 'next-auth/providers/email';
import GoogleProvider from 'next-auth/providers/google';

import { env } from '@/env.mjs';
import { siteConfig } from '@/app/config/site';
import MagicLinkEmail from '@/app/emails/magic-link-email';
import { db } from '@/app/lib/db';
import { resend } from '@/app/lib/email';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID as string,
      clientSecret: env.DISCORD_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    EmailProvider({
      sendVerificationRequest: async ({ identifier, url }) => {
        const user = await db.user.findUnique({
          where: {
            email: identifier,
          },
          select: {
            name: true,
            emailVerified: true,
          },
        });

        const userVerified = user?.emailVerified ? true : false;
        const authSubject = userVerified
          ? `Sign-in link for ${siteConfig.name}`
          : 'Activate your account';

        try {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const result = await resend.emails.send({
            from: 'And Voila Labs <onboarding@resend.dev>',
            to:
              process.env.NODE_ENV === 'development'
                ? 'delivered@resend.dev'
                : identifier,
            subject: authSubject,
            react: MagicLinkEmail({
              firstName: user?.name as string,
              actionUrl: url,
              mailType: userVerified ? 'login' : 'register',
              siteName: siteConfig.name,
            }),
            // Set this to prevent Gmail from threading emails.
            // More info: https://resend.com/changelog/custom-email-headers
            headers: {
              'X-Entity-Ref-ID': new Date().getTime() + '',
            },
          });

          // console.log(result)
        } catch (error) {
          throw new Error('Failed to send verification email.');
        }
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
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

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
  },
  // debug: process.env.NODE_ENV !== "production"
};
