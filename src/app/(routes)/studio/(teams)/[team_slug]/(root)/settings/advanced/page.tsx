import { Metadata, NextPage } from 'next';
import { notFound } from 'next/navigation';

import { APP_BP } from '#/lib/const';
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
        text="The point of no return. Delete your account here and say goodbye. We'll definitely miss you, so be careful."
      />
      <div className="grid max-w-3xl gap-10">
        <DeleteForm teamSlug={params.team_slug} />
      </div>
    </div>
  );
};

export default TeamDangerZonePage;

export function generateMetadata(): Metadata {
  const title = 'Delete Team';
  const description =
    'Permanently delete your team on And Voila, ensuring all member data is completely removed from our systems for full privacy control.';

  const baseUrl =
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001';

  const ogImageUrl = new URL(`${baseUrl}/api/og`);
  ogImageUrl.searchParams.set('title', title);

  const pageUrl = `${baseUrl}${APP_BP}/settings/workspaces`;

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
