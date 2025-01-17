import { db } from '#/lib/db';
import { getSession } from '#/lib/operations/user/session';

export interface Team {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date | null;
  isPersonal: boolean;
  image?: string | null | undefined;
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

export const getTeams = async (): Promise<
  GetTeamsResult & { activeTeamSlug: string | null }
> => {
  const session = await getSession();
  if (!session) return { teams: [], user: null, activeTeamSlug: null };

  const teams = await db.team.findMany({
    where: {
      members: {
        some: {
          userId: session.user.id,
        },
      },
    },
  });

  const personalTeamSlug = teams.find((team) => team.isPersonal)?.slug ?? null;

  return {
    teams: teams ?? [],
    user: session.user,
    activeTeamSlug: personalTeamSlug,
  };
};
