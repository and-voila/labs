import { db } from '#/lib/db';

export const getMembershipByUserIdTeamSlug = async (
  userId: string,
  teamSlug: string,
) => {
  const team = await db.team.findUnique({
    where: {
      slug: teamSlug,
    },
  });

  if (!team) {
    return null;
  }

  return db.membership.findUnique({
    where: {
      userId_teamId: {
        userId,
        teamId: team.id,
      },
    },
  });
};

export const getMembershipByMemberIdTeamSlug = async (
  memberId: string,
  teamSlug: string,
) => {
  const team = await db.team.findUnique({
    where: {
      slug: teamSlug,
    },
  });

  if (!team) {
    return null;
  }

  return db.membership.findUnique({
    where: {
      id: memberId,
      teamId: team.id,
    },
  });
};
