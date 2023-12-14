import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

interface Props {
  params: {
    team_slug: string;
  };
}

export async function GET(request: NextRequest, props: Props) {
  const { params } = props;

  redirect(`/app/${params.team_slug}/entity`);
}
