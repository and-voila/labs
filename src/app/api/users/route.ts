import { NextRequest, NextResponse } from 'next/server';

import { db } from '#/lib/db';
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
    const { email } = (await req.json()) as { email: string };

    const user = await db.user.findUnique({
      where: { email },
    });

    return NextResponse.json({ exists: Boolean(user) });
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
