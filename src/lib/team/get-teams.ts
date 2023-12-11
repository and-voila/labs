import { db } from '#/lib/db';
import { getSession } from '#/lib/session';

interface Team {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date | null;
}

interface GetTeamsResult {
  teams: Team[];
  userName: string | null;
}

export const getTeams = async (): Promise<GetTeamsResult> => {
  const session = await getSession();
  if (!session) return { teams: [], userName: null };

  const teams = await db.team.findMany({
    where: {
      members: {
        some: {
          userId: session.user.id,
        },
      },
    },
  });

  return { teams: teams ?? [], userName: session.user.name ?? null };
};
