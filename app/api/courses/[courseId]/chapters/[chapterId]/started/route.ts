import { NextResponse } from 'next/server';

import { db } from '@/app/lib/db';
import { getSession } from '@/app/lib/session';

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } },
) {
  try {
    const session = await getSession();

    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const { isStarted } = await req.json();

    const userProgress = await db.userProgress.upsert({
      where: {
        userId_chapterId: {
          userId: session.user.id,
          chapterId: params.chapterId,
        },
      },
      update: {
        isStarted,
      },
      create: {
        userId: session.user.id,
        chapterId: params.chapterId,
        isStarted,
      },
    });

    return NextResponse.json(userProgress);
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
