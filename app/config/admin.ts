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
      title: 'Playbooks',
      href: '/learn',
    },
    {
      title: 'Tools',
      href: '/tools',
      disabled: true,
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
      title: 'Admin home',
      href: '/admin',
      icon: 'home',
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
