import { InsightsSearch } from '@/app/components/insights/search';
import { InsightsSidebarNav } from '@/app/components/insights/sidebar-nav';
import { NavBar } from '@/app/components/layout/navbar';
import { SiteFooter } from '@/app/components/layout/site-footer';
import { Icons } from '@/app/components/shared/icons';
import { insightsConfig } from '@/app/config/insights';
import { getCurrentUser } from '@/app/lib/session';

interface DocsLayoutProps {
  children: React.ReactNode;
}

const rightHeader = () => (
  <div className="flex flex-1 items-center space-x-4 sm:justify-end">
    <div className="hidden lg:flex lg:grow-0">
      <InsightsSearch />
    </div>
    <div className="flex lg:hidden">
      <Icons.search className="h-6 w-6 text-muted-foreground" />
    </div>
  </div>
);

export default async function DocsLayout({ children }: DocsLayoutProps) {
  const user = await getCurrentUser();

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar
        user={user}
        items={insightsConfig.mainNav}
        rightElements={rightHeader()}
      >
        <InsightsSidebarNav items={insightsConfig.sidebarNav} />
      </NavBar>
      <div className="container flex-1">{children}</div>
      <SiteFooter className="border-t" />
    </div>
  );
}
