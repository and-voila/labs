import { CP_PREFIX } from '#/lib/const';
import { AdminConfig } from '#/lib/types';

export const adminConfig: AdminConfig = {
  sidebarNav: [
    {
      title: 'Admin home',
      href: `${CP_PREFIX}/admin`,
      icon: 'home',
    },
    {
      title: 'AI center',
      href: `${CP_PREFIX}/admin/settings`,
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
