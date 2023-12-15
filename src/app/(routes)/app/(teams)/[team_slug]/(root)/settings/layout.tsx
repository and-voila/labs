import { CP_PREFIX } from '#/lib/const';

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
              href: `${CP_PREFIX}/${params.team_slug}/settings/workspace`,
              label: 'Workspace',
            },
            {
              href: `${CP_PREFIX}/${params.team_slug}/settings/general`,
              label: 'General',
            },
            {
              href: `${CP_PREFIX}/${params.team_slug}/settings/billing`,
              label: 'Billing',
            },
            {
              href: `${CP_PREFIX}/${params.team_slug}/settings/members`,
              label: 'Members',
            },
            {
              label: 'Support',
              href: `${CP_PREFIX}/${params.team_slug}/settings/support`,
            },
            {
              label: 'Advanced',
              href: `${CP_PREFIX}/${params.team_slug}/settings/advanced`,
            },
          ]}
        />
      </div>
      <div>{children}</div>
    </DashboardShell>
  );
};

export default SettingsLayout;
