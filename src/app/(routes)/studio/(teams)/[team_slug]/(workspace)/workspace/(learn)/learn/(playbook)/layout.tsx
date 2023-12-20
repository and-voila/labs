import { redirect } from 'next/navigation';

import { authOptions } from '#/lib/auth';
import { APP_BP } from '#/lib/const';
import { getTeam } from '#/lib/operations/teams/get-current-team';

interface PlaybookRootLayoutProps {
  children: React.ReactNode;
  params: {
    team_slug: string;
  };
}

export default async function PlaybookRootLayout({
  children,
  params: { team_slug },
}: PlaybookRootLayoutProps) {
  const team = await getTeam(team_slug);

  if (!team) {
    redirect(authOptions?.pages?.signIn || '/login');
  }

  if (!team.isPersonal) {
    redirect(`${APP_BP}/${team.slug}/oops`);
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container flex-1">{children}</div>
    </div>
  );
}
