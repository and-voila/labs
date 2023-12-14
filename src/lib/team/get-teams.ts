import { db } from '#/lib/db';
import { getSession } from '#/lib/session';

export interface Team {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date | null;
  isPersonal: boolean;
}

interface GetTeamsResult {
  teams: Team[];
  user: {
    id: string;
    name: string;
    username: string;
    email: string;
    image: string;
    displayName: string;
  } | null;
}

export const getTeams = async (): Promise<GetTeamsResult> => {
  const session = await getSession();
  if (!session) return { teams: [], user: null };

  const teams = await db.team.findMany({
    where: {
      members: {
        some: {
          userId: session.user.id,
        },
      },
    },
  });

  return { teams: teams ?? [], user: session.user };
};
