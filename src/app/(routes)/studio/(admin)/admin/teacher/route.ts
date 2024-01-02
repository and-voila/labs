import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

import { APP_BP } from '#/lib/const';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest): Promise<NextResponse> {
  redirect(`${APP_BP}/admin/teacher/courses`);
}
