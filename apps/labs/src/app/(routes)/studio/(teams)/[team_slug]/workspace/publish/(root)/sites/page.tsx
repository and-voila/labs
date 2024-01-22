import type { Metadata } from 'next';

import { notFound } from 'next/navigation';

import { siteConfig } from '#/config/site';

import { APP_BP, SITE_URL } from '#/lib/const';
import { getTeam } from '#/lib/operations/teams/get-current-team';

import { DashboardHeader } from '#/components/dashboard/header';
import CreateSiteButton from '#/components/publish/create-site-button';
import CreateSiteModal from '#/components/publish/modal/create-site';
import Sites from '#/components/publish/sites';
import { Separator } from '#/components/ui/separator';

export default async function WorkspaceSitesPage({
  params,
}: {
  params: { id: string; team_slug: string };
}) {
  const team = await getTeam(params.team_slug);
  if (!team) {
    notFound();
  }
  return (
    <div className="flex flex-col gap-8">
      <DashboardHeader
        title="Workspace sites"
        description="Pick a site to manage or create a new one."
      >
        <CreateSiteButton>
          <CreateSiteModal teamSlug={params.team_slug} />
        </CreateSiteButton>
      </DashboardHeader>
      <div className="my-8 flex flex-col space-y-6 md:my-12">
        <h3 className="text-lg font-semibold leading-6">All workspace sites</h3>
        <Separator className="mb-6 mt-2" />
        <Sites teamSlug={params.team_slug} />
      </div>
    </div>
  );
}

export function generateMetadata(): Metadata {
  const title = 'Workspace Sites';
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
