import { notFound, redirect } from 'next/navigation';

import { authOptions } from '#/lib/auth';
import { getTeam } from '#/lib/operations/teams/get-current-team';
import { getSession } from '#/lib/operations/user/session';

import Document from './document';

const CollabPostIdPage = async ({
  params,
}: {
  params: { team_slug: string; id: string };
}) => {
  const session = await getSession();
  if (!session) {
    redirect(authOptions?.pages?.signIn || '/login');
  }

  const team = await getTeam(params.team_slug);
  if (!team) {
    notFound();
  }

  return (
    <Document
      teamSlug={params.team_slug}
      postId={params.id}
      teamId={team.id}
      userId={session.user.id}
    />
  );
};

export default CollabPostIdPage;
