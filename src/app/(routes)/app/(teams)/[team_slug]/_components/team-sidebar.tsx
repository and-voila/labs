'use client';

import { CP_PREFIX } from '#/lib/const';

import { Icons } from '#/components/shared/icons';
import { Sidebar } from '#/components/ui/sidebar';

export interface TeamSidebarProps {
  teamSlug: string;
}

export const TeamSidebar = (props: TeamSidebarProps) => {
  const { teamSlug } = props;
  return (
    <Sidebar
      links={[
        {
          href: `${CP_PREFIX}/${teamSlug}`,
          label: 'Dashboard',
          icon: <Icons.home />,
          exact: true,
        },
        {
          href: `${CP_PREFIX}/${teamSlug}/settings`,
          label: 'Settings',
          icon: <Icons.settings />,
        },
      ]}
    />
  );
};
