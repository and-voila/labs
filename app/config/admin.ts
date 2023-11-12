import { AdminConfig } from '@/app/lib/types';

export const adminConfig: AdminConfig = {
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
      title: 'Community',
      href: 'https://discord.com/channels/1151749282806910976/1154115151407091862',
      isExternal: true,
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
      href: '/docs',
    },
  ],
  sidebarNav: [
    {
      title: 'Admin home',
      href: '/admin',
      icon: 'gauge',
    },
    {
      title: 'AI center',
      href: '/dashboard/settings',
      icon: 'robot',
      disabled: true,
    },
    {
      title: 'Playbooks admin',
      href: '/admin/teacher/courses',
      icon: 'chalkboardTeacher',
    },
    {
      title: 'Support center',
      href: '/admin/support',
      icon: 'help',
      disabled: true,
    },
  ],
};
