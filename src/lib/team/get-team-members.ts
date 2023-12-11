import { db } from '#/lib/db';
import { getSession } from '#/lib/session';

export const getTeamMembers = async (teamSlug: string) => {
  const team = await db.team.findUnique({
    where: {
      slug: teamSlug,
    },
  });

  if (!team) {
    return null;
  }

  const session = await getSession();
  if (!session) {
    return null;
  }

  const memberships = await db.membership.findMany({
    where: {
      team: {
        id: team.id,
      },
    },
    include: {
      user: true,
    },
  });

  return memberships;
};

export type GetTeamMemberResult = Awaited<ReturnType<typeof getTeamMembers>>;
