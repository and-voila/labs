import { NextPage } from 'next';
import { notFound } from 'next/navigation';

import { getTeam } from '#/lib/team/get-current-team';

import { Separator } from '#/components/ui/separator';

import { DeleteForm } from './components/delete-form';
import { GeneralForm } from './components/general-form';

interface Props {
  params: {
    team_slug: string;
  };
}

const SettingsPage: NextPage<Props> = async ({ params }) => {
  const team = await getTeam(params.team_slug);
  if (!team) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8">
      <GeneralForm
        teamSlug={params.team_slug}
        defaultValues={{
          name: team.name,
        }}
      />

      <Separator />
      <DeleteForm teamSlug={params.team_slug} />
    </div>
  );
};

export default SettingsPage;
