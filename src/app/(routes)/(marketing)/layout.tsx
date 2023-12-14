import { Suspense } from 'react';
import { getTeams } from ':/src/lib/team/get-teams';

import { NavBar } from '#/components/layout/navbar';
import { SiteFooter } from '#/components/layout/site-footer';

interface MarketingLayoutProps {
  children: React.ReactNode;
  params: {
    team_slug: string;
  };
}

export default async function MarketingLayout({
  children,
  params,
}: MarketingLayoutProps) {
  const { user, teams } = await getTeams();

  return (
    <div className=" flex min-h-screen flex-col ">
      <Suspense fallback="...">
        <NavBar
          user={user}
          scroll={true}
          teams={teams}
          activeTeamSlug={params.team_slug}
        />
      </Suspense>
      <main className="mx-auto max-w-7xl flex-1 px-6 lg:px-12">{children}</main>
      <SiteFooter />
    </div>
  );
}
