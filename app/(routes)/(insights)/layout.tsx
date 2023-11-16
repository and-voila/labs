import { redirect } from 'next/navigation';

import { InsightsSearch } from '@/app/components/insights/search';
import { InsightsSidebarNav } from '@/app/components/insights/sidebar-nav';
import { NavBar } from '@/app/components/layout/navbar';
import { SiteFooter } from '@/app/components/layout/site-footer';
import { Icons } from '@/app/components/shared/icons';
import { insightsConfig } from '@/app/config/insights';
import { authOptions } from '@/app/lib/auth';
import { getCurrentUser } from '@/app/lib/session';

interface InsightsLayoutProps {
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

export default async function InsightsLayout({
  children,
}: InsightsLayoutProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || '/login');
  }

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
