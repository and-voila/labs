'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { SidebarNavItem } from '@/app/lib/types';
import { cn } from '@/app/lib/utils';

export interface InsightsSidebarNavProps {
  items: SidebarNavItem[];
}

export function InsightsSidebarNav({ items }: InsightsSidebarNavProps) {
  const pathname = usePathname();

  return items.length ? (
    <div className="w-full">
      {items.map((item) => (
        <div key={item.href + item.title} className={cn('pb-8')}>
          <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-bold text-primary">
            {item.title}
          </h4>
          {item.items ? (
            <InsightsSidebarNavItems items={item.items} pathname={pathname} />
          ) : null}
        </div>
      ))}
    </div>
  ) : null;
}

interface InsightsSidebarNavItemsProps {
  items: SidebarNavItem[];
  pathname: string | null;
}

export function InsightsSidebarNavItems({
  items,
  pathname,
}: InsightsSidebarNavItemsProps) {
  return items?.length ? (
    <div className="grid grid-flow-row auto-rows-max text-sm">
      {items.map((item) =>
        !item.disabled && item.href ? (
          <Link
            key={item.title + item.href}
            href={item.href}
            className={cn(
              'flex w-full items-center rounded-md p-2 hover:underline',
              {
                'bg-primary/20': pathname === item.href,
              },
            )}
            target={item.external ? '_blank' : ''}
            rel={item.external ? 'noreferrer' : ''}
          >
            {item.title}
          </Link>
        ) : (
          <span
            key={item.title + item.href}
            className="flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground"
          >
            {item.title}
          </span>
        ),
      )}
    </div>
  ) : null;
}
