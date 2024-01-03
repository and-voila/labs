import { redirect } from 'next/navigation';

import { authOptions } from '#/lib/auth';
import { getTeams } from '#/lib/operations/teams/get-teams';

import { NavBar } from '#/components/layout/navbar';
import { SiteFooter } from '#/components/layout/site-footer';

interface MyWorkspaceLayoutProps {
  children?: React.ReactNode;
  params: {
    team_slug: string;
  };
}

export default async function MyWorkspaceLayout({
  children,
  params,
}: MyWorkspaceLayoutProps) {
  const { user, teams } = await getTeams();

  if (!user) {
    redirect(authOptions?.pages?.signIn || '/login');
  }

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar user={user} teams={teams} activeTeamSlug={params.team_slug} />
      <div className="container grid flex-1 gap-12">
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
