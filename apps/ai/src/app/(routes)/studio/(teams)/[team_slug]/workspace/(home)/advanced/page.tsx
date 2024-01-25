import type { Metadata, NextPage } from 'next';

import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Alert, AlertDescription, AlertTitle } from '@and-voila/ui/alert';
import { Icons } from '@and-voila/ui/icons';
import { APP_BP } from '@and-voila/utils';

import { siteConfig } from '#/config/site';

import { SITE_URL } from '#/lib/const';
import { getTeam } from '#/lib/operations/teams/get-current-team';

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
      {team.isPersonal ? (
        <>
          <DashboardHeader
            title="Danger zone"
            description="To delete your account, visit Account Settings."
          />
          <div className="my-8 flex flex-col md:my-12">
            <Alert className="max-w-xl border-2 border-dotted border-primary/80 !pl-14">
              <Icons.warning className="fill-warning" />
              <AlertTitle>Friendship with And Voila ended</AlertTitle>
              <AlertDescription className="text-muted-foreground">
                Personal workspaces can&apos;t be removed. To delete all your
                data, including your personal workspace, please{' '}
                <Link href={`${APP_BP}/my/advanced`}>
                  <span className="font-semibold text-primary">
                    delete your account
                  </span>
                </Link>
                .
              </AlertDescription>
            </Alert>
          </div>
        </>
      ) : (
        <>
          <DashboardHeader
            title="Danger zone"
            description="The point of no return. Delete your team and its workspace here. We'll definitely miss you all, so be careful."
          />
          <div className="grid max-w-3xl gap-10">
            <DeleteForm team={team} teamSlug={params.team_slug} />
          </div>
        </>
      )}
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
