import { DashboardConfig } from '#/lib/types';

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: 'Dashboard',
      href: '/dashboard',
      isLoggedIn: true,
    },
    {
      title: 'Admin',
      href: '/admin',
      isTeacher: true,
    },
    {
      title: 'Playbooks',
      href: '/learn',
    },
    {
      title: 'Tools',
      href: '/tools',
    },
    {
      title: 'Insights',
      href: '/insights',
      disabled: true,
    },
    {
      title: 'Guides',
      href: '/guides',
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: 'Home',
      href: '/dashboard',
      icon: 'home',
    },
    {
      title: 'Billing',
      href: '/dashboard/billing',
      icon: 'creditCard',
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
      icon: 'settings',
    },
    {
      title: 'Support',
      href: '/dashboard/support',
      icon: 'help',
      disabled: true,
    },
  ],
};
