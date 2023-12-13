import { CP_PREFIX } from '#/lib/const';
import { PlaybookConfig } from '#/lib/types';

export const playbookConfig: PlaybookConfig = {
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
};
