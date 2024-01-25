import { APP_BP } from '@and-voila/utils';

import { getTeam } from '#/lib/operations/teams/get-current-team';

import { DashboardShell } from '#/components/dashboard/shell';
import { TabbedNav } from '#/components/layout/tabbed-nav';

interface WorkspaceLayoutProps {
  children: React.ReactNode;
  params: {
    team_slug: string;
  };
}

export default async function WorkspaceLayout({
  children,
  params,
}: WorkspaceLayoutProps) {
  const team = await getTeam(params.team_slug);

  const links = [
    {
      href: `${APP_BP}/${params.team_slug}/workspace`,
      label: 'Workspace',
      exact: true,
    },
    {
      href: `${APP_BP}/${params.team_slug}/workspace/settings`,
      label: 'Settings',
    },
    {
      href: `${APP_BP}/${params.team_slug}/workspace/billing`,
      label: 'Billing',
    },
    ...(team?.isPersonal
      ? []
      : [
          {
            href: `${APP_BP}/${params.team_slug}/workspace/members`,
            label: 'Members',
          },
        ]),
    {
      label: 'Support',
      href: `${APP_BP}/${params.team_slug}/workspace/support`,
    },
    {
      label: 'Advanced',
      href: `${APP_BP}/${params.team_slug}/workspace/advanced`,
    },
  ];

  return (
    <div className="w-full max-w-7xl px-8 pb-16 pt-4">
      <TabbedNav links={links} />
      <DashboardShell>{children}</DashboardShell>
    </div>
  );
}
