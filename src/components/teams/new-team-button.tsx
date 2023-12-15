'use client';

import { Icons } from '#/components/shared/icons';
import { Button } from '#/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '#/components/ui/dialog';

import { NewTeamForm } from '#/app/(routes)/app/(dashboard)/(root)/settings/workspaces/new/new-team-form';

export const NewTeamButton: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="grid h-full items-center justify-stretch rounded-md border-2 border-dotted border-primary/80 bg-transparent p-4 leading-4 hover:bg-accent">
          <span className="grid grid-flow-col items-center justify-center gap-x-2">
            <Icons.plusCircled className="text-primary" />
            <span className="font-semibold leading-7 text-foreground">
              New Team
            </span>
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Create New Team</DialogTitle>
          <DialogDescription>
            Ready to rally your crew or dazzle clients? Name your team, set the
            slug, and dive into multiplayer mode. You&apos;ll be able to invite
            people to your team once it&apos;s created.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <NewTeamForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};
