import { NextResponse } from 'next/server';

import { db } from '@/app/lib/db';
import { getSession } from '@/app/lib/session';
import { isTeacher } from '@/app/lib/teacher';

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } },
) {
  try {
    const session = await getSession();
    if (!isTeacher(session?.user?.id)) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const { url } = await req.json();

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
      },
    });

    if (!course) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const attachment = await db.attachment.create({
      data: {
        url,
        name: url.split('/').pop(),
        courseId: params.courseId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
