import { NextPage } from 'next';

import { DashboardHeader } from '#/components/dashboard/header';
import { DashboardShell } from '#/components/dashboard/shell';

interface Props {
  params: {
    team_slug: string;
  };
}

const TeamIndex: NextPage<Props> = (props) => {
  const { params } = props;

  return (
    <DashboardShell>
      <DashboardHeader
        heading={`Managing ${params.team_slug}`}
        text="AI-powered tools to assist your workflow. They'll help you save time, safeguard your IP, and crush your ROI."
      />
      You&apos;re working on team {params.team_slug}
    </DashboardShell>
  );
};

export default TeamIndex;
