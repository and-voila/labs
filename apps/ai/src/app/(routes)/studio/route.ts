import type { NextRequest, NextResponse } from 'next/server';

import { redirect } from 'next/navigation';

import { APP_BP } from '@av/utils';

export async function GET(request: NextRequest): Promise<NextResponse> {
  // eslint-disable-next-line no-console
  console.log(`Received request for: ${request.nextUrl.pathname}`);

  return redirect(`${APP_BP}/my/workspaces`);
}
