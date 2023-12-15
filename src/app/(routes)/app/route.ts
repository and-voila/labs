import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

import { CP_PREFIX } from '#/lib/const';

export async function GET(request: NextRequest): Promise<NextResponse> {
  // eslint-disable-next-line no-console
  console.log(`Received request for: ${request.nextUrl.pathname}`);

  return redirect(`${CP_PREFIX}/settings/workspaces`);
}
