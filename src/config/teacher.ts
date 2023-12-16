import { APP_BP } from '#/lib/const';
import { TeacherConfig } from '#/lib/types';

export const teacherConfig: TeacherConfig = {
  sidebarNav: [
    {
      title: 'Admin home',
      href: `${APP_BP}/admin`,
      icon: 'home',
    },
    {
      title: 'Playbooks admin',
      href: `${APP_BP}/admin/teacher/courses`,
      icon: 'chalkboardTeacher',
    },
  ],
};
