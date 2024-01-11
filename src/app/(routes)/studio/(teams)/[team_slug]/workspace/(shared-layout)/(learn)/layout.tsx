import { redirect } from 'next/navigation';

import { APP_BP } from '#/lib/const';
import { getTeam } from '#/lib/operations/teams/get-current-team';

import { DashboardShell } from '#/components/dashboard/shell';
import { TabbedNav } from '#/components/layout/tabbed-nav';
import { toast } from '#/components/ui/use-toast';

interface PlaybooksLayoutProps {
  children: React.ReactNode;
  params: {
    team_slug: string;
  };
}

export default async function PlaybooksLayout({
  children,
  params,
}: PlaybooksLayoutProps) {
  const team = await getTeam(params.team_slug);

  if (!team?.isPersonal) {
    toast({
      title: 'Access Denied',
      description:
        'Playbooks and Learn features can only be accessed from your personal workspace. Please switch to it and try again. Thanks for your patience.',
      variant: 'destructive',
    });
    redirect(`${APP_BP}/${team?.slug}/oops`);
  }

  const links = [
    {
      href: `${APP_BP}/${params.team_slug}/workspace/learn`,
      label: 'My playbooks',
      exact: true,
    },
    {
      href: `${APP_BP}/${params.team_slug}/workspace/learn/search`,
      label: 'Browse',
    },
  ];

  return (
    <div className="w-full max-w-7xl px-8 pb-16 pt-4">
      <TabbedNav links={links} />
      <DashboardShell>{children}</DashboardShell>
    </div>
  );
}
