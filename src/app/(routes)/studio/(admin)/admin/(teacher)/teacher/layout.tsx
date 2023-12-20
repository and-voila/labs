import { redirect } from 'next/navigation';

import { teacherConfig } from '#/config/teacher';

import { authOptions } from '#/lib/auth';
import { getTeams } from '#/lib/operations/teams/get-teams';
import { isTeacher } from '#/lib/teacher';

import { DashboardNav } from '#/components/layout/nav';
import { NavBar } from '#/components/layout/navbar';
import { SiteFooter } from '#/components/layout/site-footer';

interface TeacherLayoutProps {
  children?: React.ReactNode;
  params: {
    team_slug: string;
  };
}

export default async function TeacherLayout({
  children,
  params,
}: TeacherLayoutProps) {
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
          <DashboardNav items={teacherConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
