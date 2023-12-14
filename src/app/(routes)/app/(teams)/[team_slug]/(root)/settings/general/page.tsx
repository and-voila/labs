import { Metadata, NextPage } from 'next';
import { notFound } from 'next/navigation';

import { getTeam } from '#/lib/team/get-current-team';

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
      <UpdateTeamNameForm
        teamSlug={params.team_slug}
        defaultValues={{
          name: team.name,
        }}
      />
    </div>
  );
};

export default SettingsPage;

export function generateMetadata(): Metadata {
  const title = 'Team Settings';
  const description =
    'And Voila makes it easy to invite or manage team members, update your team information, or if you need to, delete your team permanently.';

  const baseUrl =
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001';

  const ogImageUrl = new URL(`${baseUrl}/api/og`);
  ogImageUrl.searchParams.set('title', title);

  const pageUrl = `${baseUrl}/app`;

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
