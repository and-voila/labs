import { NextRequest, NextResponse } from 'next/server';

import { db } from '#/lib/db';
import { getSession } from '#/lib/operations/user/session';
import { isTeacher } from '#/lib/teacher';
import { ratelimit } from '#/lib/upstash';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { courseId: string } },
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
    if (!isTeacher(session?.user?.id)) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          },
        },
      },
    });

    if (!course) {
      return new NextResponse('Not found', { status: 404 });
    }

    const hasPublishedChapter = course.chapters.some(
      (chapter) => chapter.isPublished,
    );

    if (
      !course.title ||
      !course.preview ||
      !course.description ||
      !course.imageUrl ||
      !course.categoryId ||
      !hasPublishedChapter
    ) {
      return new NextResponse('Missing required fields', { status: 401 });
    }

    const publishedCourse = await db.course.update({
      where: {
        id: params.courseId,
      },
      data: {
        isPublished: true,
      },
    });

    return NextResponse.json(publishedCourse);
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
