import { redirect } from 'next/navigation';

import { authOptions } from '#/lib/auth';
import { getTeams } from '#/lib/team/get-teams';

import { NavBar } from '#/components/layout/navbar';
import { SiteFooter } from '#/components/layout/site-footer';

interface PlaybookRootLayoutProps {
  children: React.ReactNode;
  params: {
    team_slug: string;
  };
}

export default async function PlaybookRootLayout({
  children,
  params,
}: PlaybookRootLayoutProps) {
  const { user, teams } = await getTeams();

  if (!user) {
    redirect(authOptions?.pages?.signIn || '/login');
  }

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar user={user} teams={teams} activeTeamSlug={params.team_slug} />
      <div className="container flex-1">{children}</div>
      <SiteFooter />
    </div>
  );
}
