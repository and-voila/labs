import { Metadata, NextPage } from 'next';
import { redirect } from 'next/navigation';
import { Membership } from '@prisma/client';

import { authOptions } from '#/lib/auth';
import { db } from '#/lib/db';
import { getSession } from '#/lib/session';

import { DashboardHeader } from '#/components/dashboard/header';
import { DashboardShell } from '#/components/dashboard/shell';
import { TeamGallery } from '#/components/teams/team-list';

const TeamListPage: NextPage = async () => {
  const session = await getSession();
  if (!session) {
    redirect(authOptions?.pages?.signIn || '/login');
  }

  const teams = await db.team.findMany({
    where: {
      members: {
        some: {
          userId: session.user.id,
        },
      },
    },
    include: {
      members: true,
    },
  });

  const memberships = teams
    .map((team) =>
      team.members.find((member) => member.userId === session.user.id),
    )
    .filter((membership): membership is Membership => Boolean(membership));

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Team List"
        text="Collaborate in multiplayer mode with your colleagues. Create or manage your teams."
      />
      <TeamGallery teams={teams} memberships={memberships} />
    </DashboardShell>
  );
};

export default TeamListPage;

export function generateMetadata(): Metadata {
  const title = 'Team List';
  const description =
    'Get a glimpse of your Team List on And Voila. Your hub for real-time collaboration, expert marketing strategies, and innovative AI tools.';

  const baseUrl =
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001';

  const ogImageUrl = new URL(`${baseUrl}/api/og`);
  ogImageUrl.searchParams.set('title', title);

  const pageUrl = `${baseUrl}/dashboard/team`;

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
