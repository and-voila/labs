import { APP_BP } from '#/lib/const';
import { TeamsConfig } from '#/lib/types';

export function getTeamsConfig(teamSlug: string): TeamsConfig {
  return {
    sidebarNav: [
      {
        title: 'Dashboard',
        href: `${APP_BP}/${teamSlug}/settings/workspace`,
        icon: 'home',
      },
      {
        title: 'Settings',
        href: `${APP_BP}/${teamSlug}/settings/general`,
        icon: 'settings',
      },
    ],
  };
}
