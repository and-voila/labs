import { NextRequest, NextResponse } from 'next/server';
import jsonwebtoken from 'jsonwebtoken';

import { env } from 'env';

import { ratelimit } from '#/lib/upstash';

const JWT_SECRET = env?.TIPTAP_AI_SECRET as string;

export async function POST(req: NextRequest): Promise<NextResponse> {
  const ip = req.ip ?? 'anonymous';
  const { success } = await ratelimit(5, '1 m').limit(ip);
  if (!success) {
    return NextResponse.json('Too many requests 🤨. Try again later.', {
      status: 429,
    });
  }

  const jwt = await jsonwebtoken.sign(
    {
      /* object to be encoded in the JWT */
    },
    JWT_SECRET,
  );

  return NextResponse.json({ token: jwt });
}
