import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { authOptions } from '#/lib/auth';
import { APP_BP, BASE_URL } from '#/lib/const';
import { getSession } from '#/lib/session';
import { getUserSubscriptionPlan } from '#/lib/subscription';

import { DashboardHeader } from '#/components/dashboard/header';
import { BillingInfo } from '#/components/forms/billing-info';
import { Icons } from '#/components/shared/icons';
import { Alert, AlertDescription, AlertTitle } from '#/components/ui/alert';

export default async function PersonalBillingPage() {
  const session = await getSession();
  if (!session) {
    redirect(authOptions?.pages?.signIn || '/login');
  }

  const user = session.user;

  const subscriptionPlan = await getUserSubscriptionPlan(user.id);

  return (
    <div className="flex flex-col gap-8">
      <DashboardHeader
        heading="Team workspace billing"
        text="Manage your team's subscriptions with ease. Upgrade, downgrade, or cancel at anytime. Secure as it gets thanks to our friends at Stripe."
      />
      <div className="grid max-w-3xl gap-8">
        {!subscriptionPlan.isPaid && (
          <Alert className="border-2 border-dotted border-primary/80 !pl-14">
            <Icons.rocket className="fill-primary" />
            <AlertTitle>Welcome to early access</AlertTitle>
            <AlertDescription className="text-muted-foreground">
              Get ready to watch your marketing ROI soar! Scoop up early access
              membership now to guarantee a year of top-tier digital marketing
              results at a fraction of the investment.
            </AlertDescription>
          </Alert>
        )}
        <BillingInfo subscriptionPlan={subscriptionPlan} />
      </div>
    </div>
  );
}

export function generateMetadata(): Metadata {
  const title = 'Team Billing';
  const description =
    "Subscribe, upgrade, downgrade, or even cancel your team's plan on And Voila. Secure billing portal powered by our friends at Stripe.";

  const ogImageUrl = new URL(`${BASE_URL}/api/og`);
  ogImageUrl.searchParams.set('title', title);

  const pageUrl = `${BASE_URL}${APP_BP}/settings/workspaces`;

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
