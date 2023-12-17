import { Suspense } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { siteConfig } from '#/config/site';

import { APP_BP, SITE_URL } from '#/lib/const';
import { getTeam } from '#/lib/team/get-current-team';

import { DashboardHeader } from '#/components/dashboard/header';
import { DashboardShell } from '#/components/dashboard/shell';
import CreateSiteButton from '#/components/publish/create-site-button';
import CreateSiteModal from '#/components/publish/modal/create-site';
import PlaceholderCard from '#/components/publish/placeholder-card';
import Sites from '#/components/publish/sites';

export default async function AllSites({
  params,
}: {
  params: { id: string; team_slug: string };
}) {
  const team = await getTeam(params.team_slug);
  if (!team) {
    notFound();
  }
  return (
    <DashboardShell>
      <div className="flex flex-col items-center justify-between space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 md:items-start">
        <DashboardHeader
          heading="My sites"
          text="Express, connect, and grow your brand. Set up your blog quickly with custom domains and AI-driven writing support."
        />
        <CreateSiteButton>
          <CreateSiteModal teamSlug={params.team_slug} />
        </CreateSiteButton>
      </div>
      <Suspense
        fallback={
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <PlaceholderCard key={i} />
            ))}
          </div>
        }
      >
        <Sites teamSlug={params.team_slug} />
      </Suspense>
    </DashboardShell>
  );
}

export function generateMetadata(): Metadata {
  const title = 'My Sites';
  const description = `Launch your digital presence with ${siteConfig.name}. Build and customize your site, add a domain, and go live in under 3 minutes. Your platform, your rules.`;

  const ogImageUrl = new URL(`${SITE_URL}/api/og`);
  ogImageUrl.searchParams.set('title', title);

  const pageUrl = `${SITE_URL}${APP_BP}/workspace/publish/sites`;

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
