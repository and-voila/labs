'use client';

import { DashboardHeader } from '#/components/dashboard/header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '#/components/ui/card';

import { NewTeamForm } from './new-team-form';

const NewTeamPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <DashboardHeader
        heading="Create a new team"
        text="Nice! You're just a few clicks away from collaborating in multiplayer mode."
      />
      <div className="grid max-w-3xl gap-10">
        <Card>
          <CardHeader>
            <CardTitle>New team</CardTitle>
            <CardDescription>Create a new team.</CardDescription>
          </CardHeader>
          <CardContent>
            <NewTeamForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewTeamPage;
