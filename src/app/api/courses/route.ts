import { NextRequest, NextResponse } from 'next/server';

import { db } from '#/lib/db';
import { getSession } from '#/lib/operations/user/session';
import { isTeacher } from '#/lib/teacher';
import { ratelimit } from '#/lib/upstash';

export async function POST(req: NextRequest) {
  const ip = req.ip ?? 'anonymous';
  const { success } = await ratelimit(5, '1 m').limit(ip);
  if (!success) {
    return NextResponse.json('Too many requests 🤨. Try again later.', {
      status: 429,
    });
  }

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
