import { MAX_FREE_TOKENS } from '#/lib/const';
import { db } from '#/lib/db';
import { getTeam } from '#/lib/operations/teams/get-current-team';

interface ApiLimitProps {
  params: {
    team_slug: string;
  };
}

export const increaseApiLimit = async (props: ApiLimitProps) => {
  const team = await getTeam(props.params.team_slug);

  if (!team) {
    return;
  }

  const teamApiLimit = await db.teamApiLimit.findUnique({
    where: {
      teamId: team.id,
    },
  });

  if (teamApiLimit) {
    await db.teamApiLimit.update({
      where: { teamId: team.id },
      data: { count: teamApiLimit.count + 1 },
    });
  } else {
    await db.teamApiLimit.create({
      data: {
        teamId: team.id,
        count: 1,
      },
    });
  }
};

export const checkApiLimit = async (props: ApiLimitProps) => {
  const team = await getTeam(props.params.team_slug);

  if (!team) {
    return false;
  }

  const teamApiLimit = await db.teamApiLimit.findUnique({
    where: {
      teamId: team.id,
    },
  });

  if (!teamApiLimit || teamApiLimit.count < MAX_FREE_TOKENS) {
    return true;
  } else {
    return false;
  }
};

export const getApiLimitCount = async (props: ApiLimitProps) => {
  const team = await getTeam(props.params.team_slug);

  if (!team) {
    return 0;
  }

  const teamApiLimit = await db.teamApiLimit.findUnique({
    where: {
      teamId: team.id,
    },
  });

  if (!teamApiLimit) {
    return 0;
  }

  return teamApiLimit.count;
};
