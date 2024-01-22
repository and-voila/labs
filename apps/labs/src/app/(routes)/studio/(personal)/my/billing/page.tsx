import type { Metadata } from 'next';

import { redirect } from 'next/navigation';
import { MembershipRole } from '@prisma/client';

import { siteConfig } from '#/config/site';

import { authOptions } from '#/lib/auth';
import { APP_BP, SITE_URL } from '#/lib/const';
import { db } from '#/lib/db';
import { getTeamSubscriptionPlan } from '#/lib/operations/subsctiptions/subscription';
import { getSession } from '#/lib/operations/user/session';

import { DashboardHeader } from '#/components/dashboard/header';
import { BillingInfo } from '#/components/forms/billing-info';
import { Icons } from '#/components/shared/icons';
import { Alert, AlertDescription, AlertTitle } from '#/components/ui/alert';

export default async function PersonalBillingPage() {
  const session = await getSession();
  if (!session) {
    redirect(authOptions?.pages?.signIn ?? '/login');
  }

  const user = session.user;

  const teams = await db.team.findMany({
    where: {
      members: {
        some: {
          userId: user.id,
          role: MembershipRole.OWNER,
        },
      },
    },
  });

  const subscriptionPlans = await Promise.all(
    teams.map((team) => getTeamSubscriptionPlan(team.id)),
  );

  const anyUnpaid = subscriptionPlans.some((plan) => !plan.isPaid);

  return (
    <div className="flex flex-col gap-8">
      <DashboardHeader
        title="Billing overview"
        description="View your workspace subscriptions and manage billing."
      />
      <div className="grid gap-8">
        {anyUnpaid && (
          <Alert className="max-w-xl border-2 border-dotted border-primary/80 !pl-14">
            <Icons.rocket className="fill-primary" />
            <AlertTitle>Welcome to early access</AlertTitle>
            <AlertDescription className="text-muted-foreground">
              Get ready to watch your marketing ROI soar! Scoop up early access
              membership now for your team to guarantee a year of top-tier
              digital marketing results at a fraction of the investment.
            </AlertDescription>
          </Alert>
        )}
        {/* TODO: Check undefined */}
        <div className="grid max-w-3xl grid-cols-1 gap-8">
          {subscriptionPlans.map((subscriptionPlan, index) => (
            <div key={teams[index]!.id}>
              <BillingInfo
                subscriptionPlan={subscriptionPlan}
                teamName={teams[index]!.name}
                teamSlug={teams[index]!.slug}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function generateMetadata(): Metadata {
  const title = 'Billing';
  const description = `Subscribe, upgrade, downgrade, or even cancel with ${siteConfig.name}'s easy-to-manage, secure billing portal. Powered by our friends at Stripe.`;

  const ogImageUrl = new URL(`${SITE_URL}/api/og`);
  ogImageUrl.searchParams.set('title', title);

  const pageUrl = `${SITE_URL}${APP_BP}/my/billing`;

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
