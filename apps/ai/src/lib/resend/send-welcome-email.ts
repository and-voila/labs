'use server';

import WelcomeEmail from '@and-voila/email/welcome-email';
import { APP_BP } from '@and-voila/utils';

import { siteConfig } from '#/config/site';

import { SITE_URL } from '#/lib/const';
import { resend } from '#/lib/resend/resend';

const plainTextWelcomeEmail = `🎉 Welcome!\n
Our team has been brewing up decades of marketing expertise into something special just for you. Ready to unlock your marketing superpowers?\n
Dive Right In: ${SITE_URL}${APP_BP}/my/workspaces\n\n
Quick Start Tips:\n
Start your journey in our Discord Community: https://discord.com/channels/1151749282806910976/1154115151407091862\n
Eager to share your voice? Create your site: ${SITE_URL}${APP_BP}/my/workspaces\n
Need a hand? Our Discord Support team is always ready to help: https://discord.com/channels/1151749282806910976/1151825811427561623\n
Our Good plan is free-for-life and includes generous limits. If you find yourself needing more, you can upgrade at any time at ${SITE_URL}/pricing and enjoy 50% off as an early-access member. Your membership is covered by our 100% delight guarantee.\n
— 🫶🏽 The ${siteConfig.name} Team\n
BRIL.LA, LLC. 1370 N. St. Andrews Place, Los Angeles, CA 90028`;

export async function sendWelcomeEmail({ email }: { email: string }) {
  const welcomeSubject = `Welcome to ${siteConfig.name}`;

  try {
    const result = await resend.emails.send({
      from: 'And Voila Labs <hey@e.andvoila.gg>',
      to:
        process.env.NODE_ENV === 'development' ? 'delivered@resend.dev' : email,
      subject: welcomeSubject,
      react: WelcomeEmail({
        siteUrl: SITE_URL,
      }),
      text: plainTextWelcomeEmail,
    });

    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.log(result);
    }
  } catch (error) {
    throw new Error('Failed to send welcome email.');
  }
}
