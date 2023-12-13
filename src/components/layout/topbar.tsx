import Link from 'next/link';

import { CP_PREFIX } from '#/lib/const';
import { getTeams } from '#/lib/team/get-teams';
import { cn } from '#/lib/utils';

import { Logo } from '#/components/logo-square';
import { TeamSwitcher } from '#/components/teams/team-switcher';
import UserNavSSR from '#/components/teams/user-nav-ssr';
import { Separator } from '#/components/ui/separator';

export interface TopbarProps {
  activeTeamSlug?: string;
}

export const Topbar = async (props: TopbarProps) => {
  const { activeTeamSlug } = props;

  const { teams, userName } = await getTeams();
  return (
    <div
      className={cn(
        'fixed left-0 top-0 z-20 flex items-center gap-5 px-6',
        'z-10 h-16 w-screen justify-between bg-card shadow',
      )}
    >
      <div className="grid grid-flow-col items-center gap-4">
        <Link href={`${CP_PREFIX}`}>
          <Logo />
        </Link>
        <Separator orientation="vertical" />
        <TeamSwitcher
          teams={teams}
          activeTeamSlug={activeTeamSlug}
          userName={userName}
        />
      </div>

      <div>
        <UserNavSSR />
      </div>
    </div>
  );
};
