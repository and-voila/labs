import { APP_BP } from '#/lib/const';

import { DashboardShell } from '#/components/dashboard/shell';
import { TabbedNav } from '#/components/ui/tabbed-nav';

interface SettingsLayoutProps {
  children: React.ReactNode;
  params: {
    team_slug: string;
  };
}

const SettingsLayout: React.FC<SettingsLayoutProps> = ({
  children,
  params,
}) => {
  return (
    <DashboardShell>
      <div>
        <TabbedNav
          links={[
            {
              href: `${APP_BP}/${params.team_slug}/workspace/home`,
              label: 'Workspace',
            },
            {
              href: `${APP_BP}/${params.team_slug}/workspace/settings`,
              label: 'Settings',
            },
            {
              href: `${APP_BP}/${params.team_slug}/workspace/billing`,
              label: 'Billing',
            },
            {
              href: `${APP_BP}/${params.team_slug}/workspace/members`,
              label: 'Members',
            },
            {
              label: 'Support',
              href: `${APP_BP}/${params.team_slug}/workspace/support`,
            },
            {
              label: 'Advanced',
              href: `${APP_BP}/${params.team_slug}/workspace/advanced`,
            },
          ]}
        />
      </div>
      <div>{children}</div>
    </DashboardShell>
  );
};

export default SettingsLayout;
