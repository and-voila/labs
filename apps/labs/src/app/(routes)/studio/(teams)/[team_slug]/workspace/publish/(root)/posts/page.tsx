import type { Metadata } from 'next';

import { notFound } from 'next/navigation';

import { APP_BP, SITE_URL } from '#/lib/const';
import { getTeam } from '#/lib/operations/teams/get-current-team';

import { DashboardHeader } from '#/components/dashboard/header';
import Posts from '#/components/publish/posts';
import { Separator } from '#/components/ui/separator';

export default async function WorkspacePostsPage({
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
        title="Workspace posts"
        description="Select a post to manage or edit."
      />
      <div className="my-8 flex flex-col md:my-12">
        <h3 className="text-lg font-semibold leading-6">
          Recent posts from your workspace
        </h3>
        <Separator className="mb-6 mt-2" />
        <Posts teamSlug={params.team_slug} limit={8} />
      </div>
    </div>
  );
}

export function generateMetadata(): Metadata {
  const title = 'Workspace Posts';
  const description =
    'Browse your Workspace Posts with ease. Manage, edit, and track all your content in one convenient location. Content creation made simple.';

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
