import { NextResponse } from 'next/server';

import { db } from '@/app/lib/db';
import { getSession } from '@/app/lib/session';
import { isTeacher } from '@/app/lib/teacher';

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } },
) {
  try {
    const session = await getSession();
    if (!isTeacher(session?.user?.id)) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
      },
    });

    if (!course) {
      return new NextResponse('Not found', { status: 404 });
    }

    const unpublishedCourse = await db.course.update({
      where: {
        id: params.courseId,
      },
      data: {
        isPublished: false,
      },
    });

    return NextResponse.json(unpublishedCourse);
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
