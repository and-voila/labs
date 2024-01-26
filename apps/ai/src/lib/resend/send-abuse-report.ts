'use server';

import { AbuseReportEmail } from '@av/email/abuse-report-email';

import { siteConfig } from '#/config/site';

import { SITE_URL } from '#/lib/const';
import { resend } from '#/lib/resend/resend';

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
      react: AbuseReportEmail({
        urlToReport,
        siteName: siteConfig.name,
        siteUrl: SITE_URL,
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
