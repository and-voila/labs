import { NextRequest, NextResponse } from 'next/server';

import { db } from '#/lib/db';
import { getSession } from '#/lib/operations/user/session';
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
