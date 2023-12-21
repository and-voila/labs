import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

import { APP_BP } from '#/lib/const';

interface Props {
  params: {
    team_slug: string;
  };
}

export async function GET(request: NextRequest, props: Props) {
  const { params } = props;

  redirect(`${APP_BP}/${params.team_slug}/workspace`);
}
