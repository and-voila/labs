import { NextRequest } from 'next/server';
import { customAlphabet } from 'nanoid';

import { APP_BP } from '#/lib/const';

export const dynamic = 'auto';
export const dynamicParams = true;
export const runtime = 'edge';

interface Props {
  params: {
    team_slug: string;
  };
}

const getNanoId = (): string => {
  const nanoid = customAlphabet('6789BCDFGHJKLMNPQRTWbcdfghjkmnpqrtwz', 10);
  return nanoid();
};

export async function GET(
  request: NextRequest,
  props: Props,
): Promise<Response> {
  const { params } = props;

  if (!params || !params.team_slug) {
    // Handle the error appropriately, e.g., return a 400 Bad Request response
    return new Response('Bad Request', { status: 400 });
  }

  return new Response(null, {
    status: 307, // Use 308 for a permanent redirect, 307 for a temporary redirect
    headers: {
      Location: `${APP_BP}/${
        params.team_slug
      }/workspace/publish/post/new/${getNanoId()}`,
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}
