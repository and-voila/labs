import { NextResponse } from 'next/server';

import { db } from '#/lib/db';
import { getSession } from '#/lib/session';
import { isTeacher } from '#/lib/teacher';

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; attachmentId: string } },
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
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const attachment = await db.attachment.delete({
      where: {
        courseId: params.courseId,
        id: params.attachmentId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
