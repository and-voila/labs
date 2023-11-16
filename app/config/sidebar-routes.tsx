'use client';

import { usePathname } from 'next/navigation';

import { SidebarItem } from '@/app/components/sidebar-item';
import { Route } from '@/app/lib/types';

const dashboardRoutes: Route[] = [
  {
    id: 'dashboard',
    icon: 'home',
    label: 'Dashboard',
    href: '/',
  },
  {
    id: 'learn',
    icon: 'courses',
    label: 'Learn',
    href: '/learn',
  },
  {
    id: 'ai-tools',
    icon: 'robot',
    label: 'AI Tools',
    href: '/tools',
  },
  {
    id: 'settings',
    icon: 'settings',
    label: 'Settings',
    href: '/settings',
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
    href: '/support',
  },
];

const learnRoutes: Route[] = [
  {
    id: 'dashboard',
    icon: 'home',
    label: 'Dashboard',
    href: '/',
  },
  {
    id: 'learn',
    icon: 'bookmarks',
    label: 'My Playbooks',
    href: '/learn',
  },
  {
    id: 'browse',
    icon: 'courses',
    label: 'Browse',
    href: '/learn/search',
  },
];

const teacherRoutes: Route[] = [
  {
    id: 'courses',
    icon: 'courses',
    label: 'Courses',
    href: '/admin/teacher/courses',
  },
  {
    id: 'analytics',
    icon: 'barchart',
    label: 'Analytics',
    href: '/admin/teacher/analytics',
  },
];

const toolsRoutes: Route[] = [
  {
    id: 'dashboard',
    icon: 'home',
    label: 'Dashboard',
    href: '/',
  },
  {
    id: 'overview',
    icon: 'gauge',
    label: 'Overview',
    href: '/tools',
  },
  {
    id: 'sites',
    icon: 'browsers',
    label: 'Sites',
    href: '/tools/sites',
  },
];

export const SidebarRoutes = () => {
  const pathname = usePathname();

  let routes: Route[] = [];

  if (pathname?.startsWith('/admin/teacher')) {
    routes = teacherRoutes;
  } else if (pathname?.startsWith('/learn')) {
    routes = learnRoutes;
  } else if (pathname?.startsWith('/tools')) {
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
