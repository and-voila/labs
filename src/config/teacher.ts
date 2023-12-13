import { CP_PREFIX } from '#/lib/const';
import { TeacherConfig } from '#/lib/types';

export const teacherConfig: TeacherConfig = {
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
      title: 'Playbooks admin',
      href: `${CP_PREFIX}/admin/teacher/courses`,
      icon: 'chalkboardTeacher',
    },
  ],
};
