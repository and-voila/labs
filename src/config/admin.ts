import { APP_BP } from '#/lib/const';
import { AdminConfig } from '#/lib/types';

export const adminConfig: AdminConfig = {
  sidebarNav: [
    {
      title: 'Admin home',
      href: `${APP_BP}/admin`,
      icon: 'home',
    },
    {
      title: 'AI center',
      href: `${APP_BP}/admin/settings`,
      icon: 'robot',
      disabled: true,
    },
    {
      title: 'Playbooks admin',
      href: `${APP_BP}/admin/teacher/courses`,
      icon: 'chalkboardTeacher',
    },
    {
      title: 'Support center',
      href: `${APP_BP}/admin/support`,
      icon: 'help',
      disabled: true,
    },
  ],
};
