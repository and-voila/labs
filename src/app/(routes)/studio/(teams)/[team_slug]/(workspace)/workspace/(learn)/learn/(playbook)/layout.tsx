import { redirect } from 'next/navigation';
import { APP_BP } from ':/src/lib/const';
import { getTeam } from ':/src/lib/team/get-current-team';

import { authOptions } from '#/lib/auth';

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
