import type { NextRequest, NextResponse } from 'next/server';

import { redirect } from 'next/navigation';

import { APP_BP } from '#/lib/const';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest): Promise<NextResponse> {
  redirect(`${APP_BP}/my/workspaces`);
}
