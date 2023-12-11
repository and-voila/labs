import { db } from '#/lib/db';
import { getSession } from '#/lib/session';

export const getTeam = async (teamSlug: string) => {
  const session = await getSession();
  if (!session) return null;

  const team = await db.team.findUnique({
    where: {
      slug: teamSlug,
    },
    include: {
      members: {
        where: {
          userId: session.user.id,
          accepted: true,
        },
      },
    },
  });

  if (!team || team.members.length === 0) return null;

  return team;
};
