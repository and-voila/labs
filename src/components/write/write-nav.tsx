'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

import { writeConfig } from '#/config/write';

import { getSiteFromPostId } from '#/lib/actions';
import { cn } from '#/lib/utils';

import { Icons } from '#/components/shared/icons';

export type Tab = {
  name: string;
  href: string;
  icon: keyof typeof Icons;
};

export interface WriteNavProps {
  teamSlug: string;
}

export default function WriteNav({ teamSlug }: WriteNavProps) {
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
    const config = writeConfig({ teamSlug });
    if (pathname.includes('site') && id) {
      return config.siteTabs(id);
    } else if (pathname.includes('post') && id && siteId) {
      return config.postTabs(id, siteId);
    }
    return config.defaultTabs;
  }, [pathname, id, siteId, teamSlug]);

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
