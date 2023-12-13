import { redirect } from 'next/navigation';

import { getTeamsConfig } from '#/config/teams';

import { authOptions } from '#/lib/auth';
import { getSession } from '#/lib/session';
import { hasTeamAccess } from '#/lib/team/team-authority';

import { DashboardNav } from '#/components/layout/nav';
import { NavBar } from '#/components/layout/navbar';
import { SiteFooter } from '#/components/layout/site-footer';

interface TeamsLayoutProps {
  children?: React.ReactNode;
  params: {
    team_slug: string;
  };
}

export default async function TeamsLayout({
  children,
  params,
}: TeamsLayoutProps) {
  const session = await getSession();
  if (!session) {
    redirect(authOptions?.pages?.signIn || '/login');
  }

  if (!(await hasTeamAccess(session.user.id, params.team_slug))) {
    redirect('/app');
  }

  const user = session.user;

  const teamsConfig = getTeamsConfig(params.team_slug);

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <NavBar user={user} scroll={false} activeTeamSlug={params.team_slug}>
        <DashboardNav
          items={teamsConfig.sidebarNav}
          teamSlug={params.team_slug}
        />
      </NavBar>

      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav
            items={teamsConfig.sidebarNav}
            teamSlug={params.team_slug}
          />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
