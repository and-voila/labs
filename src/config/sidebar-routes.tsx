'use client';

import { usePathname } from 'next/navigation';

import { CP_PREFIX } from '#/lib/const';
import { Route } from '#/lib/types';

import { SidebarItem } from '#/components/sidebar-item';

const dashboardRoutes: Route[] = [
  {
    id: 'dashboard',
    icon: 'home',
    label: 'Dashboard',
    href: `${CP_PREFIX}`,
  },
  {
    id: 'learn',
    icon: 'courses',
    label: 'Learn',
    href: `${CP_PREFIX}/learn`,
  },
  {
    id: 'ai-tools',
    icon: 'robot',
    label: 'AI Tools',
    href: `${CP_PREFIX}/tools`,
  },
  {
    id: 'settings',
    icon: 'settings',
    label: 'Settings',
    href: `${CP_PREFIX}/settings`,
  },
  {
    id: 'documentation',
    icon: 'docs',
    label: 'Documentation',
    href: '/insights',
  },
  {
    id: 'support',
    icon: 'help',
    label: 'Support',
    href: `${CP_PREFIX}/support`,
  },
];

const learnRoutes: Route[] = [
  {
    id: 'dashboard',
    icon: 'home',
    label: 'Dashboard',
    href: `${CP_PREFIX}`,
  },
  {
    id: 'learn',
    icon: 'bookmarks',
    label: 'My Playbooks',
    href: `${CP_PREFIX}/learn`,
  },
  {
    id: 'browse',
    icon: 'courses',
    label: 'Browse',
    href: `${CP_PREFIX}/learn/search`,
  },
];

const teacherRoutes: Route[] = [
  {
    id: 'courses',
    icon: 'courses',
    label: 'Courses',
    href: `${CP_PREFIX}/admin/teacher/courses`,
  },
  {
    id: 'analytics',
    icon: 'barchart',
    label: 'Analytics',
    href: `${CP_PREFIX}/admin/teacher/analytics`,
  },
];

const toolsRoutes: Route[] = [
  {
    id: 'dashboard',
    icon: 'home',
    label: 'Dashboard',
    href: `${CP_PREFIX}`,
  },
  {
    id: 'overview',
    icon: 'gauge',
    label: 'Overview',
    href: `${CP_PREFIX}/tools`,
  },
  {
    id: 'sites',
    icon: 'browsers',
    label: 'Sites',
    href: `${CP_PREFIX}/tools/sites`,
  },
];

export const SidebarRoutes = () => {
  const pathname = usePathname();

  let routes: Route[] = [];

  if (pathname?.startsWith(`${CP_PREFIX}/admin/teacher`)) {
    routes = teacherRoutes;
  } else if (pathname?.startsWith(`${CP_PREFIX}/learn`)) {
    routes = learnRoutes;
  } else if (pathname?.startsWith(`${CP_PREFIX}/tools`)) {
    routes = toolsRoutes;
  } else {
    routes = dashboardRoutes;
  }

  return (
    <div className="mt-6 flex w-full flex-col">
      {routes.map((route) => (
        <SidebarItem
          key={route.id}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
