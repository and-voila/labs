'use client';

import Link from 'next/link';
import { useParams, useSelectedLayoutSegment } from 'next/navigation';

import { cn } from '@/app/lib/utils';

export default function SiteSettingsNav() {
  const { id } = useParams() as { id?: string };
  const segment = useSelectedLayoutSegment();

  const navItems = [
    {
      name: 'General',
      href: `/tools/write/site/${id}/settings`,
      segment: null,
    },
    {
      name: 'Domains',
      href: `/tools/write/site/${id}/settings/domains`,
      segment: 'domains',
    },
    {
      name: 'Appearance',
      href: `/tools/write/site/${id}/settings/appearance`,
      segment: 'appearance',
    },
  ];

  return (
    <div className="flex max-w-3xl space-x-4 border-b border-brand/70 pb-5 pt-2">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={cn(
            'rounded-md px-2 py-1 text-sm font-medium transition-colors active:bg-stone-200 dark:active:bg-stone-600',
            segment === item.segment
              ? 'bg-brand/20 text-brand'
              : 'text-muted-foreground hover:bg-brand/20 hover:text-foreground',
          )}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}
