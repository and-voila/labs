/* eslint-disable camelcase */
import { APP_BP } from '#/lib/const';
import { PlaybooksConfig } from '#/lib/types';

export const playbooksConfig = (team_slug: string): PlaybooksConfig => ({
  sidebarNav: [
    {
      title: 'My playbooks',
      href: `${APP_BP}/${team_slug}/learn`,
      icon: 'bookmarks',
    },
    {
      title: 'Browse',
      href: `${APP_BP}/${team_slug}/learn/search`,
      icon: 'courses',
    },
  ],
});
