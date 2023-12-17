import { Suspense } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { siteConfig } from '#/config/site';

import { APP_BP, SITE_URL } from '#/lib/const';
import { getTeam } from '#/lib/team/get-current-team';

import { DashboardHeader } from '#/components/dashboard/header';
import { DashboardShell } from '#/components/dashboard/shell';
import OverviewSitesCTA from '#/components/publish/overview-sites-cta';
import PlaceholderCard from '#/components/publish/placeholder-card';
import Posts from '#/components/publish/posts';
import Sites from '#/components/publish/sites';

interface OverviewPageProps {
  params: {
    team_slug: string;
    id: string;
  };
}

export default async function Overview({ params }: OverviewPageProps) {
  const team = await getTeam(params.team_slug);
  if (!team) {
    notFound();
  }
  return (
    <DashboardShell>
      <div className="flex flex-col items-center justify-between space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 md:items-start">
        <DashboardHeader
          heading="Write"
          text="Launch your blog in under 3 minutes with a custom domain. Overcome writer's block with our AI-assisted editor."
        />
        <Suspense fallback={null}>
          <OverviewSitesCTA teamSlug={params.team_slug} />
        </Suspense>
      </div>

      <div className="my-8 flex flex-col space-y-6">
        <div className="border-b border-primary/70 pb-5">
          <h3 className="text-2xl font-semibold leading-6">Sites</h3>
        </div>
        <Suspense
          fallback={
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <PlaceholderCard key={i} />
              ))}
            </div>
          }
        >
          <Sites teamSlug={params.team_slug} />
        </Suspense>
      </div>

      <div className="flex flex-col space-y-6">
        <div className="border-b border-primary/70 pb-5">
          <h3 className="text-2xl font-semibold leading-6">Recent posts</h3>
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
          <Posts teamSlug={params.team_slug} limit={8} />
        </Suspense>
      </div>
    </DashboardShell>
  );
}

export function generateMetadata(): Metadata {
  const title = 'Write';
  const description = `Experience the magic of AI-assisted blogging with ${siteConfig.name}. Create, publish, and manage engaging content with simplicity and speed. Get started today, free.`;

  const ogImageUrl = new URL(`${SITE_URL}/api/og`);
  ogImageUrl.searchParams.set('title', title);

  const pageUrl = `${SITE_URL}${APP_BP}/workspace/publish`;

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
