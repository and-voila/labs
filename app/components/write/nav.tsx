'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams, useSelectedLayoutSegments } from 'next/navigation';

import { getSiteFromPostId } from '@/app/lib/actions';
import { cn } from '@/app/lib/utils';

import { Icons } from '../shared/icons';

type Tab = {
  name: string;
  href: string;
  icon: keyof typeof Icons;
  isActive?: boolean;
};

export default function Nav() {
  const segments = useSelectedLayoutSegments();
  const { id } = useParams() as { id?: string };

  const [siteId, setSiteId] = useState<string | null>();

  useEffect(() => {
    if (segments[0] === 'post' && id) {
      getSiteFromPostId(id).then((id) => {
        setSiteId(id);
      });
    }
  }, [segments, id]);

  const tabs = useMemo<Tab[]>(() => {
    if (segments[0] === 'site' && id) {
      return [
        {
          name: 'Back to All Sites',
          href: '/tools/write/sites',
          icon: 'arrowLeft',
        },
        {
          name: 'Posts',
          href: `/tools/write/site/${id}`,
          isActive: segments.length === 2,
          icon: 'file',
        },
        {
          name: 'Analytics',
          href: `/tools/write/site/${id}/analytics`,
          isActive: segments.includes('analytics'),
          icon: 'barchart',
        },
        {
          name: 'Settings',
          href: `/tools/write/site/${id}/settings`,
          isActive: segments.includes('settings'),
          icon: 'settings',
        },
      ];
    } else if (segments[0] === 'post' && id) {
      return [
        {
          name: 'Back to All Posts',
          href: siteId ? `/tools/write/site/${siteId}` : '/tools/write/sites',
          icon: 'arrowLeft',
        },
        {
          name: 'Editor',
          href: `/tools/write/post/${id}`,
          isActive: segments.length === 2,
          icon: 'pen',
        },
        {
          name: 'Settings',
          href: `/tools/write/post/${id}/settings`,
          isActive: segments.includes('settings'),
          icon: 'settings',
        },
      ];
    }
    return [
      {
        name: 'Overview',
        href: '/tools/write/',
        isActive: segments.length === 0,
        icon: 'home',
      },
      {
        name: 'Sites',
        href: '/tools/write/sites',
        isActive: segments[0] === 'sites',
        icon: 'browsers',
      },
      {
        name: 'Settings',
        href: '/tools/write/settings',
        isActive: segments[0] === 'settings',
        icon: 'settings',
      },
    ];
  }, [segments, id, siteId]);

  return (
    <>
      <nav className="grid items-start gap-2">
        {tabs.map(({ name, href, isActive, icon }) => {
          const Icon = Icons[icon];
          return (
            <Link key={name} href={href}>
              <span
                className={cn(
                  'group flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-brand/20 hover:text-foreground',
                  isActive ? 'bg-brand/20 text-foreground' : 'transparent',
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
