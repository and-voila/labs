import { NextRequest, NextResponse } from 'next/server';

import { db } from '#/lib/db';
import { getTeams } from '#/lib/operations/teams/get-teams';
import { ratelimit } from '#/lib/upstash';

export async function PUT(
  req: NextRequest,
  { params }: { params: { courseId: string; chapterId: string } },
) {
  const ip = req.ip ?? 'anonymous';
  const { success } = await ratelimit(5, '1 m').limit(ip);
  if (!success) {
    return NextResponse.json('Too many requests 🤨. Try again later.', {
      status: 429,
    });
  }

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
