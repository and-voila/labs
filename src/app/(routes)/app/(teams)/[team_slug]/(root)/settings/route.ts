import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

import { CP_PREFIX } from '#/lib/const';

interface Props {
  params: {
    team_slug: string;
  };
}

export async function GET(request: NextRequest, props: Props) {
  const { params } = props;

  redirect(`${CP_PREFIX}/${params.team_slug}/settings/workspace`);
}
