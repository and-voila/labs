'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

import { Icons } from '@/app/components/shared/icons';
import { writeConfig } from '@/app/config/write';
import { getSiteFromPostId } from '@/app/lib/actions';
import { cn } from '@/app/lib/utils';

export type Tab = {
  name: string;
  href: string;
  icon: keyof typeof Icons;
};

export default function WriteNav() {
  const pathname = usePathname();
  const { id } = useParams() as { id?: string };

  const [siteId, setSiteId] = useState<string | null>();

  useEffect(() => {
    if (pathname.includes('post') && id) {
      getSiteFromPostId(id).then((id) => {
        setSiteId(id);
      });
    }
  }, [pathname, id]);

  const tabs = useMemo<Tab[]>(() => {
    if (pathname.includes('site') && id) {
      return writeConfig.siteTabs(id);
    } else if (pathname.includes('post') && id && siteId) {
      return writeConfig.postTabs(id, siteId);
    }
    return writeConfig.defaultTabs;
  }, [pathname, id, siteId]);

  return (
    <>
      <nav className="grid items-start gap-2">
        {tabs.map(({ name, href, icon }) => {
          const Icon = Icons[icon];
          return (
            <Link key={name} href={href}>
              <span
                className={cn(
                  'group flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-primary/20 hover:text-foreground',
                  pathname === href
                    ? 'bg-primary/20 text-foreground'
                    : 'transparent',
                )}
              >
                <Icon className="mr-1 h-4 w-4" />
                <span>{name}</span>
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
