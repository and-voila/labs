import { TeacherConfig } from '@/app/lib/types';

export const teacherConfig: TeacherConfig = {
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
      title: 'Admin home',
      href: '/admin',
      icon: 'home',
    },
    {
      title: 'Playbooks admin',
      href: '/admin/teacher/courses',
      icon: 'chalkboardTeacher',
    },
  ],
};
