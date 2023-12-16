// src/lib/resend/send-team-invite-email.ts
import { siteConfig } from '#/config/site';

import { SITE_URL } from '#/lib/const';
import { resend } from '#/lib/resend/resend';

import { Template } from '#/emails/team-invite-email';

export async function sendTeamInviteEmail(
  teamName: string,
  token: string,
  email: string,
  invitedBy: string,
) {
  const subject = `You've been invited to join ${teamName} on ${siteConfig.name}`;
  const url = `${SITE_URL}/invitations/${token}`;
  const plainTextEmail = `You have been invited to join the team "${teamName}" on ${siteConfig.name}.\n\nPlease use the following link to accept the invitation: ${url}\n\nIf you did not request this, please ignore this email.`;

  try {
    const result = await resend.emails.send({
      from: 'And Voila Labs <labs@e.andvoila.gg>',
      to:
        process.env.NODE_ENV === 'development' ? 'delivered@resend.dev' : email,
      subject: subject,
      react: Template({
        teamName,
        link: url,
        appName: siteConfig.name,
        invitedBy,
      }),
      text: plainTextEmail,
    });

    // eslint-disable-next-line no-console
    console.log(`Your team invite link for ${email}: ${url}`);

    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.log(result);
    }
  } catch (error) {
    throw new Error('Failed to send team invite email.');
  }
}
