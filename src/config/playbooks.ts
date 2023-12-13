import { CP_PREFIX } from '#/lib/const';
import { PlaybooksConfig } from '#/lib/types';

export const playbooksConfig: PlaybooksConfig = {
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
