import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getTeams } from ':/src/lib/team/get-teams';

import { playbooksConfig } from '#/config/playbooks';

import { authOptions } from '#/lib/auth';
import { CP_PREFIX } from '#/lib/const';

import { DashboardNav } from '#/components/layout/nav';
import { NavBar } from '#/components/layout/navbar';
import { SiteFooter } from '#/components/layout/site-footer';
import { Icons } from '#/components/shared/icons';
import { Button } from '#/components/ui/button';

interface PlaybookRootLayoutProps {
  children: React.ReactNode;
  params: {
    team_slug: string;
  };
}

const rightHeader = () => (
  <div className="mr-8 flex flex-1 items-center space-x-4 sm:justify-end">
    <Link href={`${CP_PREFIX}/learn/search`}>
      <Button size="sm" variant="secondary">
        <Icons.signOut className="mr-2 h-4 w-4 text-primary" />
        Exit
      </Button>
    </Link>
  </div>
);

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
      <NavBar
        user={user}
        rightElements={rightHeader()}
        teams={teams}
        activeTeamSlug={params.team_slug}
      >
        <DashboardNav items={playbooksConfig.sidebarNav} />
      </NavBar>
      <div className="container flex-1">{children}</div>
      <SiteFooter />
    </div>
  );
}
