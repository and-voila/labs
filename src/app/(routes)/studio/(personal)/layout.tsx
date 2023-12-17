import { redirect } from 'next/navigation';

import { authOptions } from '#/lib/auth';
import { getTeams } from '#/lib/team/get-teams';

import { NavBar } from '#/components/layout/navbar';
import { SiteFooter } from '#/components/layout/site-footer';

interface DashboardLayoutProps {
  children?: React.ReactNode;
  params: {
    team_slug: string;
  };
}

export default async function DashboardLayout({
  children,
  params,
}: DashboardLayoutProps) {
  const { user, teams } = await getTeams();

  if (!user) {
    redirect(authOptions?.pages?.signIn || '/login');
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <NavBar
        user={user}
        teams={teams}
        activeTeamSlug={params.team_slug}
        scroll={false}
      />

      <div className="container grid flex-1 gap-12">
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}