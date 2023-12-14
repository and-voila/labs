import { NextPage } from 'next';

import { DashboardHeader } from '#/components/dashboard/header';
import { DashboardShell } from '#/components/dashboard/shell';

interface Props {
  params: {
    team_slug: string;
  };
}

const OopsPage: NextPage<Props> = (props) => {
  const { params } = props;

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Hop over to your personal workspace"
        text="Whoops, looks like Learn features are playing hide and seek in your personal workspace. Switch to your personal account to find them."
      />
      <p className="max-w-lg text-lg text-muted-foreground">
        Hey there, you&apos;re in team mode under{' '}
        <span className="font-semibold text-primary">{params.team_slug}</span>{' '}
        right now. Just a quick leap to the top left team switcher, and you can
        jump into your personal playground.
      </p>
      <p className="max-w-lg text-lg text-muted-foreground">
        <span className="font-semibold text-primary">
          Thanks for sticking around
        </span>
        {''} while our developer, the king of soon, is leveling up.
      </p>
    </DashboardShell>
  );
};

export default OopsPage;
