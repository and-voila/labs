import { redirect } from 'next/navigation';

import { defaultSidebarLinks } from '#/config/default-sidebar-links';

import { authOptions } from '#/lib/auth';
import { getTeams } from '#/lib/operations/teams/get-teams';
import { isTeacher } from '#/lib/teacher';

import { MobileNotSupported } from '#/components/dashboard/mobile-not-supported';
import { NavBar } from '#/components/layout/navbar';
import { Sidebar } from '#/components/layout/sidebar';
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
  const { user, teams, activeTeamSlug: personalTeamSlug } = await getTeams();
  const activeTeamSlug = params.team_slug || personalTeamSlug;

  if (!user) {
    redirect(authOptions?.pages?.signIn || '/login');
  } else if (!isTeacher(user.id)) {
    redirect('/not-authorized');
  }

  const links = defaultSidebarLinks(activeTeamSlug, user);

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar user={user} teams={teams} activeTeamSlug={activeTeamSlug} />
      <div className="flex flex-1 flex-col ps-16 pt-16">
        <Sidebar links={links} />
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          <MobileNotSupported />
          {children}
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
