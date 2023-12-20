import { NextResponse } from 'next/server';

import { db } from '#/lib/db';
import { getSession } from '#/lib/operations/user/session';

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } },
) {
  try {
    const session = await getSession();

    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const { isStarted, teamId } = await req.json();

    const userProgress = await db.userProgress.upsert({
      where: {
        teamId_chapterId: {
          teamId: teamId,
          chapterId: params.chapterId,
        },
      },
      update: {
        isStarted,
      },
      create: {
        teamId: teamId,
        chapterId: params.chapterId,
        isStarted,
      },
    });

    return NextResponse.json(userProgress);
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
