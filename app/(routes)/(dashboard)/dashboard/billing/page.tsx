import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { BillingInfo } from '@/app/components/billing-info';
import { DashboardHeader } from '@/app/components/dashboard/header';
import { DashboardShell } from '@/app/components/dashboard/shell';
import { Icons } from '@/app/components/shared/icons';
import { Alert, AlertDescription, AlertTitle } from '@/app/components/ui/alert';
import { authOptions } from '@/app/lib/auth';
import { getSession } from '@/app/lib/session';
import { getUserSubscriptionPlan } from '@/app/lib/subscription';

export default async function BillingPage() {
  const session = await getSession();
  if (!session) {
    redirect(authOptions?.pages?.signIn || '/login');
  }

  const user = session.user;

  const subscriptionPlan = await getUserSubscriptionPlan(user.id);

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Billing"
        text="Manage billing and your membership plan."
      />
      <div className="grid max-w-3xl gap-8">
        {!subscriptionPlan && (
          <Alert className="!pl-14">
            <Icons.rocket className="fill-brand" />
            <AlertTitle>Welcome to early access</AlertTitle>
            <AlertDescription className="text-muted-foreground">
              Get ready to watch your marketing ROI soar! Scoop up early access
              membership now to guarantee a year of top-tier digital marketing
              results at half the investment.
            </AlertDescription>
          </Alert>
        )}
        <BillingInfo subscriptionPlan={subscriptionPlan} />
      </div>
    </DashboardShell>
  );
}

export function generateMetadata(): Metadata {
  const title = 'Billing';
  const description =
    "Subscribe, upgrade, downgrade, or even cancel with And Voila's easy-to-manage, secure billing portal. Powered by our friends at Stripe.";

  const baseUrl =
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001';

  const ogImageUrl = new URL(`${baseUrl}/api/og`);
  ogImageUrl.searchParams.set('title', title);

  const pageUrl = `${baseUrl}/dashboard/billing`;

  const metadata = {
    title,
    description,
    openGraph: {
      type: 'website',
      title,
      description,
      images: [
        {
          url: ogImageUrl.toString(),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      url: pageUrl,
    },
    twitter: {
      title,
      description,
      images: [
        {
          url: ogImageUrl.toString(),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };

  return metadata;
}
