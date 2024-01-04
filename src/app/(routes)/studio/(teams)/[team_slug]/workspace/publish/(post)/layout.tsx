import React from 'react';
import { redirect } from 'next/navigation';

import { authOptions } from '#/lib/auth';
import { getTeams } from '#/lib/operations/teams/get-teams';
import { hasTeamAccess } from '#/lib/operations/teams/team-authority';

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
  const { user } = await getTeams();

  if (!user) {
    redirect(authOptions?.pages?.signIn || '/login');
  }

  if (!(await hasTeamAccess(user.id, params.team_slug))) {
    redirect('/not-authorized');
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex w-full flex-1 flex-col overflow-hidden">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
