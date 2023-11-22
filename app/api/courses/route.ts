import { NextResponse } from 'next/server';

import { db } from '@/app/lib/db';
import { getSession } from '@/app/lib/session';
import { isTeacher } from '@/app/lib/teacher';

export async function POST(req: Request) {
  try {
    const session = await getSession();
    const userId = session?.user?.id;
    const { title, price } = await req.json();

    if (!userId || !isTeacher(userId)) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const course = await db.course.create({
      data: {
        userId,
        title,
        price,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
