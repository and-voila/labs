import { CP_PREFIX } from '#/lib/const';
import { AdminConfig } from '#/lib/types';

export const adminConfig: AdminConfig = {
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
      title: 'Admin home',
      href: `${CP_PREFIX}/admin`,
      icon: 'home',
    },
    {
      title: 'AI center',
      href: `${CP_PREFIX}/settings`,
      icon: 'robot',
      disabled: true,
    },
    {
      title: 'Playbooks admin',
      href: `${CP_PREFIX}/admin/teacher/courses`,
      icon: 'chalkboardTeacher',
    },
    {
      title: 'Support center',
      href: `${CP_PREFIX}/admin/support`,
      icon: 'help',
      disabled: true,
    },
  ],
};
