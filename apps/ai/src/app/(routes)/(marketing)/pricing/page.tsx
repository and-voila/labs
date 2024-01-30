import type { Metadata } from 'next';

import { SITE_URL } from '#/lib/const';
import { getTeamSubscriptionPlan } from '#/lib/operations/subsctiptions/subscription';
import { getTeams } from '#/lib/operations/teams/get-teams';

import { PricingCards } from '#/components/marketing/pricing-cards';
import { PricingFaq } from '#/components/marketing/pricing-faq';

export default async function PricingPage() {
  const { teams, activeTeamSlug } = await getTeams();

  let subscriptionPlan;
  const teamSlug = activeTeamSlug ?? undefined;
  let teamId = null;

  const activeTeam = teams.find((team) => team.slug === activeTeamSlug);
  teamId = activeTeam?.id;

  if (teamId) {
    subscriptionPlan = await getTeamSubscriptionPlan(teamId);
  }

  return (
    <div className="flex w-full flex-col gap-16 py-8">
      <PricingCards
        subscriptionPlan={subscriptionPlan}
        isPublic
        teamSlug={teamSlug}
        teamId={teamId}
      />
      <hr className="container" />
      <PricingFaq />
    </div>
  );
}

export function generateMetadata(): Metadata {
  const title = 'Pricing';
  const description =
    "Get started free, no credit card required. Access our playbooks, check out our AI tools, and browse the community. When you're ready, upgrade your membership.";

  const ogImageUrl = new URL(`${SITE_URL}/api/og`);
  ogImageUrl.searchParams.set('title', title);

  const pageUrl = `${SITE_URL}/pricing`;

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
