import type { Metadata, NextPage } from 'next';

import { notFound } from 'next/navigation';

import { APP_BP } from '@av/utils';

import { siteConfig } from '#/config/site';

import { SITE_URL } from '#/lib/const';
import { getTeamSubscriptionPlan } from '#/lib/operations/subsctiptions/subscription';
import { getTeam } from '#/lib/operations/teams/get-current-team';

import { DashboardHeader } from '#/components/dashboard/header';
import { PricingCards } from '#/components/marketing/pricing-cards';

interface Props {
  params: {
    team_slug: string;
  };
}

const WorkspaceBillingPage: NextPage<Props> = async ({ params }) => {
  const team = await getTeam(params.team_slug);
  if (!team) {
    notFound();
  }

  const subscriptionPlan = await getTeamSubscriptionPlan(team.id);
  let descriptionText;

  if (subscriptionPlan.title === 'Good') {
    descriptionText = `Your workspace is on the free ${subscriptionPlan.title} plan.`;
  } else {
    const billingInterval =
      subscriptionPlan.interval === 'month' ? 'monthly' : 'yearly';
    descriptionText = `Your workspace is on the ${subscriptionPlan.title} plan, billed ${billingInterval}.`;
  }

  return (
    <div className="flex flex-col gap-8 md:gap-12">
      <DashboardHeader
        title="Team workspace billing"
        description={descriptionText}
      />

      <PricingCards
        teamId={team.id}
        subscriptionPlan={subscriptionPlan}
        teamSlug={params.team_slug}
      />
    </div>
  );
};

export default WorkspaceBillingPage;

export function generateMetadata(): Metadata {
  const title = 'Team Billing';
  const description = `Subscribe, upgrade, downgrade, or even cancel your team's plan on ${siteConfig.name}. Secure billing portal powered by our friends at Stripe.`;

  const ogImageUrl = new URL(`${SITE_URL}/api/og`);
  ogImageUrl.searchParams.set('title', title);

  const pageUrl = `${SITE_URL}${APP_BP}/my/workspaces`;

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
