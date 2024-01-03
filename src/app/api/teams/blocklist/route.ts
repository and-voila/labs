import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@vercel/kv';

import { env } from 'env';

import { ratelimit } from '#/lib/upstash';

export const dynamic = 'force-dynamic';

const kvClient = createClient({
  url: env.KV_REST_API_URL,
  token: env.KV_REST_API_TOKEN,
});

export async function GET(req: NextRequest) {
  const ip = req.ip ?? 'anonymous';
  const { success } = await ratelimit(5, '1 m').limit(ip);
  if (!success) {
    return NextResponse.json("Don't DDoS me pls 🥺", { status: 429 });
  }

  try {
    const blockListString = await kvClient.get('blocklist');
    const blockList = JSON.parse(blockListString as string) as string[];

    return NextResponse.json(blockList);
  } catch (error) {
    return NextResponse.error();
  }
}
