import { DashboardNav } from '#/components/layout/nav';
import { NavBar } from '#/components/layout/navbar';
import { SiteFooter } from '#/components/layout/site-footer';
import { toolsConfig } from '#/config/tools';
import { authOptions } from '#/lib/auth';
import { getSession } from '#/lib/session';
import { redirect } from 'next/navigation';

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
          <DashboardNav items={toolsConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
