import { NextResponse } from 'next/server';

import { db } from '#/lib/db';
import { getTeams } from '#/lib/operations/teams/get-teams';

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } },
) {
  try {
    const { user, teams } = await getTeams();
    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const personalTeam = teams.find((team) => team.isPersonal);
    if (!personalTeam) {
      return new NextResponse('No personal team found', { status: 404 });
    }
    const { isCompleted } = await req.json();

    const userProgress = await db.userProgress.upsert({
      where: {
        teamId_chapterId: {
          teamId: personalTeam.id,
          chapterId: params.chapterId,
        },
      },
      update: {
        isCompleted,
      },
      create: {
        teamId: personalTeam.id,
        chapterId: params.chapterId,
        isCompleted,
      },
    });

    return NextResponse.json(userProgress);
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
