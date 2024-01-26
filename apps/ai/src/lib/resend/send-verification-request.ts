'use server';

import VerificationRequestEmail from '@and-voila/email/verification-request-email';

import { siteConfig } from '#/config/site';

import { SITE_URL } from '#/lib/const';
import { db } from '#/lib/db';
import { resend } from '#/lib/resend/resend';

export async function sendVerificationRequest({
  identifier,
  url,
}: {
  identifier: string;
  url: string;
}) {
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
    : `Activate your ${siteConfig.name} account`;

  const plainTextEmail = `🌺 Aloha,\n\nWe're excited to have you on board at And Voila. Just one more click and you're in. ${
    userVerified ? 'Log in' : 'Activate your account'
  } with the magic link below.\n\n${url}\n\nExpires in 24 hours and is a one-time pass.\n\n---\n\nWe sent you this email because you asked for a magic link. If it wasn't you, please ignore it.\n\nBRIL.LA, LLC. 1370 N. St. Andrews Place, Los Angeles, CA 90028`;

  try {
    const result = await resend.emails.send({
      from: 'And Voila Labs <hey@e.andvoila.gg>',
      to:
        process.env.NODE_ENV === 'development'
          ? 'delivered@resend.dev'
          : identifier,
      subject: authSubject,
      react: VerificationRequestEmail({
        actionUrl: url,
        mailType: userVerified ? 'login' : 'register',
        siteName: siteConfig.name,
        siteUrl: SITE_URL,
      }),
      text: plainTextEmail,
      // Set this to prevent Gmail from threading emails.
      headers: {
        'X-Entity-Ref-ID': new Date().getTime() + '',
      },
    });

    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.log(result);
    }
  } catch (error) {
    throw new Error('Failed to send verification email.');
  }
}
