'use server';

import { siteConfig } from '#/config/site';

import { resend } from '#/lib/resend/resend';

import { SendAbuseReportEmail } from '#/emails/abuse-report-email';

export async function sendAbuseReportEmail(domain: string, slug?: string) {
  const urlToReport = slug ? `https://${domain}/${slug}` : `https://${domain}`;
  const subject = `Abuse Report - ${siteConfig.name}`;
  const plainTextEmail = `An abuse report has been submitted for the following URL: ${urlToReport} on ${siteConfig.name}.\n\nThe team will review the content and take appropriate action as per our Terms of Service.`;

  try {
    const result = await resend.emails.send({
      from: 'And Voila Labs <labs@e.andvoila.gg>',
      to:
        process.env.NODE_ENV === 'development'
          ? 'delivered@resend.dev'
          : 'abuse@bril.la',
      subject: subject,
      react: SendAbuseReportEmail({
        urlToReport,
        siteName: siteConfig.name,
      }),
      text: plainTextEmail,
    });

    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.log(`Abuse report sent for URL: ${urlToReport}`);
      // eslint-disable-next-line no-console
      console.log(result);
    }
  } catch (error) {
    throw new Error('Failed to send abuse report email.');
  }
}
