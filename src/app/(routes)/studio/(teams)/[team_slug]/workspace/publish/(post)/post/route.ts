import { NextRequest } from 'next/server';

import { APP_BP } from '#/lib/const';

export const dynamic = 'auto';
export const dynamicParams = true;
export const runtime = 'edge';

interface Props {
  params: {
    team_slug: string;
    id: string;
  };
}

export async function GET(
  request: NextRequest,
  props: Props,
): Promise<Response> {
  const { params } = props;

  if (!params || !params.team_slug || !params.id) {
    return new Response('Bad Request', { status: 400 });
  }

  return new Response(null, {
    status: 308,
    headers: {
      Location: `${APP_BP}/${params.team_slug}/workspace/publish/post/${params.id}`,
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}
