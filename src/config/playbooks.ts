import { CP_PREFIX } from '#/lib/const';
import { PlaybooksConfig } from '#/lib/types';

export const playbooksConfig: PlaybooksConfig = {
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
      title: 'My playbooks',
      href: `${CP_PREFIX}/learn`,
      icon: 'bookmarks',
    },
    {
      title: 'Browse',
      href: `${CP_PREFIX}/learn/search`,
      icon: 'courses',
    },
  ],
};
