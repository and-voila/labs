'use client';

import { NewTeamForm } from '#/components/forms/new-team-form';
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

export const NewTeamButton: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="grid h-full items-center justify-stretch rounded-md border-2 border-dotted border-primary/80 bg-transparent p-4 leading-4 hover:bg-accent">
          <span className="grid grid-flow-col items-center justify-center gap-x-2">
            <Icons.plusCircled className="text-primary" />
            <span className="font-semibold leading-7 text-foreground">
              New workspace
            </span>
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Create a team workspace</DialogTitle>
          <DialogDescription>
            Ready to rally your crew or dazzle clients? Name your workspace, set
            the slug, and dive into multiplayer mode. You&apos;ll be able to
            invite your team once it&apos;s created.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <NewTeamForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};
