import { redirect } from 'next/navigation';

import { adminConfig } from '#/config/admin';

import { authOptions } from '#/lib/auth';
import { isTeacher } from '#/lib/teacher';
import { getTeams } from '#/lib/team/get-teams';

import { DashboardNav } from '#/components/layout/nav';
import { NavBar } from '#/components/layout/navbar';
import { SiteFooter } from '#/components/layout/site-footer';

interface AdminLayoutProps {
  children?: React.ReactNode;
  params: {
    team_slug: string;
  };
}

export default async function AdminLayout({
  children,
  params,
}: AdminLayoutProps) {
  const { user, teams } = await getTeams();
  if (!user) {
    redirect(authOptions?.pages?.signIn || '/login');
  } else if (!isTeacher(user.id)) {
    redirect('/not-authorized');
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <NavBar
        user={user}
        teams={teams}
        activeTeamSlug={params.team_slug}
        scroll={false}
      />
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col py-8 md:flex">
          <DashboardNav items={adminConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
