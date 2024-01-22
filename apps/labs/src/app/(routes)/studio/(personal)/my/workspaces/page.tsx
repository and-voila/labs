import type { Membership } from '@prisma/client';
import type { Metadata, NextPage } from 'next';

import { redirect } from 'next/navigation';

import { authOptions } from '#/lib/auth';
import { APP_BP, SITE_URL } from '#/lib/const';
import { db } from '#/lib/db';
import { getSession } from '#/lib/operations/user/session';

import { DashboardHeader } from '#/components/dashboard/header';
import { TeamList } from '#/components/teams/team-list';

const WorkspacesPage: NextPage = async () => {
  const session = await getSession();
  if (!session) {
    redirect(authOptions?.pages?.signIn ?? '/login');
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
    <div className="flex flex-col gap-8">
      <DashboardHeader
        title="Your workspaces"
        description="Dive right in to create, collaborate, and bring your ideas to life."
      />
      <div className="my-8 grid md:my-12">
        <TeamList teams={teams} memberships={memberships} />
      </div>
    </div>
  );
};

export default WorkspacesPage;

export function generateMetadata(): Metadata {
  const title = 'Workspaces';
  const description =
    'Dive into your digital marketing world. Pick a workspace and let the creativity flow.';

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
