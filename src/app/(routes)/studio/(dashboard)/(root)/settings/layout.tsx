import { APP_BP } from '#/lib/const';

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
            href: `${APP_BP}/settings/workspaces`,
          },
          {
            href: `${APP_BP}/settings/general`,
            label: 'General',
          },
          {
            label: 'Billing',
            href: `${APP_BP}/settings/billing`,
          },
          {
            label: 'Support',
            href: `${APP_BP}/settings/support`,
          },
          {
            label: 'Advanced',
            href: `${APP_BP}/settings/advanced`,
          },
        ]}
      />
      <div>{children}</div>
    </DashboardShell>
  );
};

export default AppRootLayout;
