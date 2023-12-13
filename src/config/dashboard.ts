import { CP_PREFIX } from '#/lib/const';
import { DashboardConfig } from '#/lib/types';

export const dashboardConfig: DashboardConfig = {
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
