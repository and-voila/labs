import { db } from '#/lib/db';
import { getSession } from '#/lib/operations/user/session';

export const getTeamInvites = async (teamSlug: string) => {
  const session = await getSession();
  if (!session) {
    return null;
  }

  const team = await db.team.findUnique({
    where: {
      slug: teamSlug,
    },
  });

  if (!team) {
    return null;
  }

  const invites = await db.teamInvitation.findMany({
    where: {
      team: {
        id: team.id,
      },
    },
  });

  return invites;
};

export type GetTeamInvitesReturn = Awaited<ReturnType<typeof getTeamInvites>>;
