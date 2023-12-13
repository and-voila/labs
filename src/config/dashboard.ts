import { CP_PREFIX } from '#/lib/const';
import { DashboardConfig } from '#/lib/types';

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: 'Dashboard',
      href: `${CP_PREFIX}`,
      isLoggedIn: true,
    },
    {
      title: 'Admin',
      href: `${CP_PREFIX}/admin`,
      isTeacher: true,
    },
    {
      title: 'Playbooks',
      href: `${CP_PREFIX}/learn`,
    },
    {
      title: 'Tools',
      href: `${CP_PREFIX}/tools`,
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
      href: `${CP_PREFIX}`,
      icon: 'home',
    },
    {
      title: 'Teams',
      href: `${CP_PREFIX}/team`,
      icon: 'team',
    },
    {
      title: 'Billing',
      href: `${CP_PREFIX}/billing`,
      icon: 'creditCard',
    },
    {
      title: 'Settings',
      href: `${CP_PREFIX}/settings`,
      icon: 'settings',
    },
    {
      title: 'Support',
      href: `${CP_PREFIX}/support`,
      icon: 'help',
      disabled: true,
    },
  ],
};
