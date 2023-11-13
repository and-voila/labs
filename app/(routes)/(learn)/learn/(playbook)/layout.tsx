import Link from 'next/link';

import { DashboardNav } from '@/app/components/layout/nav';
import { NavBar } from '@/app/components/layout/navbar';
import { SiteFooter } from '@/app/components/layout/site-footer';
import { Icons } from '@/app/components/shared/icons';
import { Button } from '@/app/components/ui/button';
import { playbookConfig } from '@/app/config/playbook';
import { playbooksConfig } from '@/app/config/playbooks';
import { getCurrentUser } from '@/app/lib/session';

interface PlaybookRootLayoutProps {
  children: React.ReactNode;
}

const rightHeader = () => (
  <div className="mr-8 flex flex-1 items-center space-x-4 sm:justify-end">
    <Link href="/learn/search">
      <Button size="sm" variant="secondary">
        <Icons.signOut className="mr-2 h-4 w-4" />
        Exit playbook
      </Button>
    </Link>
  </div>
);

export default async function PlaybookRootLayout({
  children,
}: PlaybookRootLayoutProps) {
  const user = await getCurrentUser();

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar
        user={user}
        items={playbookConfig.mainNav}
        rightElements={rightHeader()}
      >
        <DashboardNav items={playbooksConfig.sidebarNav} />
      </NavBar>
      <div className="container flex-1">{children}</div>
      <SiteFooter className="border-t" />
    </div>
  );
}
