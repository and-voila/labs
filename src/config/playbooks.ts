/* eslint-disable camelcase */
import { CP_PREFIX } from '#/lib/const';
import { PlaybooksConfig } from '#/lib/types';

export const playbooksConfig = (team_slug: string): PlaybooksConfig => ({
  sidebarNav: [
    {
      title: 'My playbooks',
      href: `${CP_PREFIX}/${team_slug}/learn`,
      icon: 'bookmarks',
    },
    {
      title: 'Browse',
      href: `${CP_PREFIX}/${team_slug}/learn/search`,
      icon: 'courses',
    },
  ],
});
