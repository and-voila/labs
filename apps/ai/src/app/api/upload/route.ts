import { env } from '#/env';

import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { ipAddress } from '@vercel/edge';
import { nanoid } from 'nanoid';

import { ratelimit } from '#/lib/upstash';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const ip = ipAddress(req) ?? 'anonymous';
  const { success } = await ratelimit(5, '1 m').limit(ip);
  if (!success) {
    return new Response('Too many requests 🤨. Try again later.', {
      status: 429,
    });
  }

  if (!env.BLOB_READ_WRITE_TOKEN) {
    return new Response(
      "Missing BLOB_READ_WRITE_TOKEN. Don't forget to add that to your .env file.",
      {
        status: 401,
      },
    );
  }

  const file = req.body ?? '';
  const contentType = req.headers.get('content-type') ?? 'text/plain';
  const filename = `${nanoid()}.${contentType.split('/')[1]}`;
  const blob = await put(filename, file, {
    contentType,
    access: 'public',
  });

  return NextResponse.json(blob);
}
