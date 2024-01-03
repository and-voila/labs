import { redirect } from 'next/navigation';

import { defaultSidebarLinks } from '#/config/default-sidebar-links';

import { authOptions } from '#/lib/auth';
import { getTeams } from '#/lib/operations/teams/get-teams';
import { hasTeamAccess } from '#/lib/operations/teams/team-authority';

import { NavBar } from '#/components/layout/navbar';
import { Sidebar } from '#/components/layout/sidebar';
import { SiteFooter } from '#/components/layout/site-footer';

interface PostLayoutProps {
  children?: React.ReactNode;
  params: {
    team_slug: string;
  };
}

export default async function PostSharedLayout({
  children,
  params,
}: PostLayoutProps) {
  const { user, teams } = await getTeams();
  const activeTeamSlug = params.team_slug;

  if (!user) {
    redirect(authOptions?.pages?.signIn || '/login');
  }

  if (!(await hasTeamAccess(user.id, params.team_slug))) {
    redirect('/not-authorized');
  }

  const links = defaultSidebarLinks(activeTeamSlug, user);

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar user={user} teams={teams} activeTeamSlug={params.team_slug} />
      <div className="flex flex-1 flex-col ps-16 pt-16">
        <Sidebar links={links} />
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
