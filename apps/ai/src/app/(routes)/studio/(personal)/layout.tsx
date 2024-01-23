import React from 'react';
import { redirect } from 'next/navigation';

import { defaultSidebarLinks } from '#/config/default-sidebar-links';

import { authOptions } from '#/lib/auth';
import { getTeams } from '#/lib/operations/teams/get-teams';

import { NavBar } from '#/components/layout/navbar';
import { Sidebar } from '#/components/layout/sidebar';
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
  const { user, teams, activeTeamSlug: personalTeamSlug } = await getTeams();
  const activeTeamSlug = params.team_slug || personalTeamSlug;

  if (!user) {
    redirect(authOptions?.pages?.signIn ?? '/login');
  }

  const links = defaultSidebarLinks(activeTeamSlug);

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar user={user} teams={teams} activeTeamSlug={activeTeamSlug} />
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
