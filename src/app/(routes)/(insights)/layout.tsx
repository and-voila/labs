import { redirect } from 'next/navigation';

import { authOptions } from '#/lib/auth';
import { getTeams } from '#/lib/operations/teams/get-teams';
import { isTeacher } from '#/lib/teacher';

import { InsightsSearch } from '#/components/insights/search';
import { NavBar } from '#/components/layout/navbar';
import { SiteFooter } from '#/components/layout/site-footer';
import { Icons } from '#/components/shared/icons';

interface InsightsLayoutProps {
  children: React.ReactNode;
  params: {
    team_slug: string;
  };
}

const rightHeader = () => (
  <div className="flex flex-1 items-center space-x-4 sm:justify-end">
    <div className="hidden lg:flex lg:grow-0">
      <InsightsSearch />
    </div>
    <div className="flex lg:hidden">
      <Icons.search className="h-6 w-6 text-muted-foreground" />
    </div>
  </div>
);

export default async function InsightsLayout({
  children,
  params,
}: InsightsLayoutProps) {
  const { user, teams } = await getTeams();
  if (!user) {
    redirect(authOptions?.pages?.signIn || '/login');
  } else if (!isTeacher(user.id)) {
    redirect('/not-authorized');
  }

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar
        user={user}
        rightElements={rightHeader()}
        teams={teams}
        activeTeamSlug={params.team_slug}
      />
      <div className="container flex-1 py-8">{children}</div>
      <SiteFooter />
    </div>
  );
}
