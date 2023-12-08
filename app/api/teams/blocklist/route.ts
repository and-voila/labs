import { NextResponse } from 'next/server';
import { createClient } from '@vercel/kv';

import { env } from '@/env.mjs';

export const dynamic = 'force-dynamic';

const kvClient = createClient({
  url: env.KV_REST_API_URL,
  token: env.KV_REST_API_TOKEN,
});

export async function GET() {
  try {
    const blockListString = await kvClient.get('blocklist');
    const blockList = JSON.parse(blockListString as string) as string[];

    return NextResponse.json(blockList);
  } catch (error) {
    return NextResponse.error();
  }
}
