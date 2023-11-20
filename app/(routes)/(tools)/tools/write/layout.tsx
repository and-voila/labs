import { redirect } from 'next/navigation';

import { DashboardNav } from '@/app/components/layout/nav';
import { NavBar } from '@/app/components/layout/navbar';
import { SiteFooter } from '@/app/components/layout/site-footer';
import WriteNav from '@/app/components/write/write-nav';
import { toolsConfig } from '@/app/config/tools';
import { authOptions } from '@/app/lib/auth';
import { getSession } from '@/app/lib/session';

interface ToolsLayoutProps {
  children?: React.ReactNode;
}

export default async function ToolsLayout({ children }: ToolsLayoutProps) {
  const session = await getSession();
  if (!session) {
    redirect(authOptions?.pages?.signIn || '/login');
  }

  const user = session.user;

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <NavBar user={user} items={toolsConfig.mainNav} scroll={false}>
        <DashboardNav items={toolsConfig.sidebarNav} />
      </NavBar>

      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <WriteNav />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
