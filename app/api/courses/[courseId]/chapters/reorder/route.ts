import { NextResponse } from 'next/server';

import { db } from '@/app/lib/db';
import { getCurrentUser } from '@/app/lib/session';
import { isTeacher } from '@/app/lib/teacher';

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string } },
) {
  try {
    const user = await getCurrentUser();
    const userId = user?.id;

    if (!isTeacher(userId)) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { list } = await req.json();

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
      },
    });

    if (!course) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    for (const item of list) {
      await db.chapter.update({
        where: { id: item.id },
        data: { position: item.position },
      });
    }

    return new NextResponse('Success', { status: 200 });
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
