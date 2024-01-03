import { APP_BP } from '#/lib/const';
import { isTeacher } from '#/lib/teacher';
import { SidebarLink } from '#/lib/types';

import { IconProps, Icons } from '#/components/shared/icons';

export const defaultSidebarLinks = (
  activeTeamSlug: string,
  user: { id: string } | null,
): SidebarLink[] => {
  const links: SidebarLink[] = [
    {
      href: `${APP_BP}/${activeTeamSlug}/workspace`,
      label: 'Home',
      icon: Icons.home({} as IconProps),
      exact: true,
    },
    ...(isTeacher(user?.id)
      ? [
          {
            href: `${APP_BP}/admin`,
            label: 'Admin',
            icon: Icons.airTrafficControl({} as IconProps),
            exact: true,
          },
        ]
      : []),
    {
      href: `${APP_BP}/${activeTeamSlug}/workspace/learn`,
      label: 'Learn',
      icon: Icons.courses({} as IconProps),
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
