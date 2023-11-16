import { Suspense } from 'react';

import { NavBar } from '@/app/components/layout/navbar';
import { SiteFooter } from '@/app/components/layout/site-footer';
import { marketingConfig } from '@/app/config/marketing';
import { getSession } from '@/app/lib/session';

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  const session = await getSession();
  const user = session?.user || null;

  return (
    <div className="flex min-h-screen flex-col">
      <Suspense fallback="...">
        <NavBar user={user} items={marketingConfig.mainNav} scroll={true} />
      </Suspense>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
