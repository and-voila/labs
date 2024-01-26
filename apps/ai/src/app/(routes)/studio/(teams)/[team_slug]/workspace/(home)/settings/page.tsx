import type { Metadata, NextPage } from 'next';

import { notFound } from 'next/navigation';

import { APP_BP } from '@av/utils';

import { siteConfig } from '#/config/site';

import { SITE_URL } from '#/lib/const';
import { getTeam } from '#/lib/operations/teams/get-current-team';

import { DashboardHeader } from '#/components/dashboard/header';
import { UpdateTeamNameForm } from '#/components/forms/update-team-name-form';

interface Props {
  params: {
    team_slug: string;
  };
}

const SettingsPage: NextPage<Props> = async ({ params }) => {
  const team = await getTeam(params.team_slug);
  if (!team) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8">
      <DashboardHeader
        title="Workspace settings"
        description="Time to refresh your team name. More settings en route."
      />
      <div className="my-8 grid max-w-3xl gap-8 md:my-12">
        <UpdateTeamNameForm
          teamSlug={params.team_slug}
          defaultValues={{
            name: team.name,
          }}
        />
      </div>
    </div>
  );
};

export default SettingsPage;

export function generateMetadata(): Metadata {
  const title = 'Team Settings';
  const description = `${siteConfig.name} makes it easy to invite or manage team members, update your team information, or if you need to, delete your team permanently.`;

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
