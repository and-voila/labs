import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

import { CP_PREFIX } from '#/lib/const';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest): Promise<NextResponse> {
  redirect(`${CP_PREFIX}/settings/workspaces`);
}
