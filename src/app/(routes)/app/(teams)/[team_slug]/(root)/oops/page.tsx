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
        heading="Switch to personal team to Learn"
        text="Sorry about that, Learn features are tied to your personal workspace. Just switch to your personal team to access Learn features."
      />
      <p className="max-w-lg text-lg text-muted-foreground">
        Right now, you&apos;re using team{' '}
        <span className="font-semibold text-primary">{params.team_slug}</span>.
        You can use the team switcher at the top left of the page to switch to
        your personal team.
      </p>
    </DashboardShell>
  );
};

export default OopsPage;
