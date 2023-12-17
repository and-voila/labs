import { redirect } from 'next/navigation';

import { playbooksConfig } from '#/config/playbooks';

import { authOptions } from '#/lib/auth';
import { APP_BP } from '#/lib/const';
import { getTeams } from '#/lib/team/get-teams';

import { DashboardNav } from '#/components/layout/nav';
import { toast } from '#/components/ui/use-toast';

interface PlaybooksLayoutProps {
  children?: React.ReactNode;
  params: {
    team_slug: string;
  };
}

export default async function PlaybooksLayout({
  children,
  params,
}: PlaybooksLayoutProps) {
  const { user, teams } = await getTeams();
  const team = teams.find((team) => team.slug === params.team_slug);

  if (!user) {
    redirect(authOptions?.pages?.signIn || '/login');
  }

  if (!team?.isPersonal) {
    toast({
      title: 'Access Denied',
      description:
        'Playbooks and Learn features can only be accessed from your personal workspace. Please switch to it and try again. Thanks for your patience.',
      variant: 'destructive',
    });
    redirect(`${APP_BP}/${team?.slug}/oops`);
  }

  const config = playbooksConfig(team.slug);

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col py-8 md:flex">
          <DashboardNav items={config.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}