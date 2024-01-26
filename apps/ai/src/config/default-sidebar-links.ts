import type { SidebarLink } from '#/lib/types';

import type { IconProps } from '@av/ui/icons';
import { Icons } from '@av/ui/icons';
import { APP_BP } from '@av/utils';

export const defaultSidebarLinks = (
  activeTeamSlug: string | null | undefined,
): SidebarLink[] => {
  const links: SidebarLink[] = [
    {
      href: `${APP_BP}/${activeTeamSlug}/workspace`,
      label: 'Home',
      icon: Icons.home({} as IconProps),
      exact: true,
    },
    {
      href: `${APP_BP}/${activeTeamSlug}/workspace/publish`,
      label: 'Publish',
      icon: Icons.browser({} as IconProps),
    },
    {
      href: `${APP_BP}/${activeTeamSlug}/workspace/support`,
      label: 'Help',
      icon: Icons.help({} as IconProps),
    },
  ];

  return links;
};
