import { CP_PREFIX } from '#/lib/const';

import { DashboardShell } from '#/components/dashboard/shell';
import { TabbedNav } from '#/components/ui/tabbed-nav';

interface AppRootLayoutProps {
  children: React.ReactNode;
}

const AppRootLayout: React.FC<AppRootLayoutProps> = ({ children }) => {
  return (
    <DashboardShell>
      <TabbedNav
        links={[
          {
            label: 'Workspaces',
            href: `${CP_PREFIX}/settings/workspaces`,
          },
          {
            href: `${CP_PREFIX}/settings/general`,
            label: 'General',
          },
          {
            label: 'Billing',
            href: `${CP_PREFIX}/settings/billing`,
          },
          {
            label: 'Support',
            href: `${CP_PREFIX}/settings/support`,
          },
          {
            label: 'Advanced',
            href: `${CP_PREFIX}/settings/advanced`,
          },
        ]}
      />
      <div>{children}</div>
    </DashboardShell>
  );
};

export default AppRootLayout;
