import { NextResponse } from 'next/server';

import { db } from '#/lib/db';
import { getSession } from '#/lib/operations/user/session';
import { isTeacher } from '#/lib/teacher';

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string } },
) {
  try {
    const session = await getSession();
    if (!isTeacher(session?.user?.id)) {
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
