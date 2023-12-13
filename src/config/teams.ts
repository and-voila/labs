import { CP_PREFIX } from '#/lib/const';
import { TeamsConfig } from '#/lib/types';

export function getTeamsConfig(teamSlug: string): TeamsConfig {
  return {
    sidebarNav: [
      {
        title: 'Dashboard',
        href: `${CP_PREFIX}/${teamSlug}`,
        icon: 'home',
      },
      {
        title: 'Settings',
        href: `${CP_PREFIX}/${teamSlug}/settings`,
        icon: 'settings',
      },
    ],
  };
}