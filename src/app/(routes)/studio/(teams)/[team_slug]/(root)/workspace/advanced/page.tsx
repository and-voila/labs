import { Metadata, NextPage } from 'next';
import { notFound } from 'next/navigation';

import { siteConfig } from '#/config/site';

import { APP_BP, SITE_URL } from '#/lib/const';
import { getTeam } from '#/lib/team/get-current-team';

import { DashboardHeader } from '#/components/dashboard/header';
import { DeleteForm } from '#/components/forms/delete-team-form';

interface Props {
  params: {
    team_slug: string;
  };
}

const TeamDangerZonePage: NextPage<Props> = async ({ params }) => {
  const team = await getTeam(params.team_slug);
  if (!team) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8">
      <DashboardHeader
        heading="Danger Zone"
        text="The point of no return. Delete your team and its workspace here. We'll definitely miss you all, so be careful."
      />
      <div className="grid max-w-3xl gap-10">
        <DeleteForm teamSlug={params.team_slug} />
      </div>
    </div>
  );
};

export default TeamDangerZonePage;

export function generateMetadata(): Metadata {
  const title = 'Delete Workspace';
  const description = `Permanently delete your team and team workspace on ${siteConfig.name}, ensuring all member data is completely removed from our systems for full privacy control.`;

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
