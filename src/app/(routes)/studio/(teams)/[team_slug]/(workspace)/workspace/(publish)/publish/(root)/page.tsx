import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { siteConfig } from '#/config/site';

import { APP_BP, SITE_URL } from '#/lib/const';
import { getTeam } from '#/lib/operations/teams/get-current-team';

import { DashboardHeader } from '#/components/dashboard/header';
import OverviewSitesCTA from '#/components/publish/overview-sites-cta';
import Posts from '#/components/publish/posts';
import Sites from '#/components/publish/sites';
import { Separator } from '#/components/ui/separator';

interface PublishPageProps {
  params: {
    team_slug: string;
    id: string;
  };
}

export default async function WorkspacePublishPage({
  params,
}: PublishPageProps) {
  const team = await getTeam(params.team_slug);
  if (!team) {
    notFound();
  }
  return (
    <div className="flex flex-col gap-8">
      <DashboardHeader
        title="Publish home"
        description="Set up your blog in a snap with custom domains, AI-powered tools, and top-notch IP protection."
      >
        <OverviewSitesCTA teamSlug={params.team_slug} />
      </DashboardHeader>
      <div className="my-8 flex flex-col">
        <h3 className="text-lg font-semibold leading-6">Sites</h3>
        <Separator className="mb-6 mt-2 bg-primary/80" />
        <Sites teamSlug={params.team_slug} />
      </div>
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold leading-6">Recent posts</h3>
        <Separator className="mb-6 mt-2 bg-primary/80" />
        <Posts teamSlug={params.team_slug} limit={8} />
      </div>
    </div>
  );
}

export function generateMetadata(): Metadata {
  const title = 'Publish';
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
