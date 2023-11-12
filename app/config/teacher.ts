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
      disabled: true,
    },
    {
      title: 'Insights',
      href: '/docs',
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: 'Admin home',
      href: '/admin',
      icon: 'gauge',
    },
    {
      title: 'Playbooks admin',
      href: '/admin/teacher/courses',
      icon: 'chalkboardTeacher',
    },
    {
      title: 'Playbooks analytics',
      href: '/admin/teacher/analytics',
      icon: 'analytics',
    },
  ],
};
