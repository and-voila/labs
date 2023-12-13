import { CP_PREFIX } from '#/lib/const';
import { TeacherConfig } from '#/lib/types';

export const teacherConfig: TeacherConfig = {
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
