import { db } from '#/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
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
