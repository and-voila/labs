'use client';

import { useParams } from 'next/navigation';

import { Button } from '#/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '#/components/ui/dialog';

import { NewCollabPostForm } from './form/new-collab-post-form';

export const NewCollabPostButton: React.FC = () => {
  const { id: siteId, team_slug: teamSlug } = useParams() as {
    id: string;
    team_slug: string;
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">New post</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Create new post</DialogTitle>
          <DialogDescription>
            Add a title and description to your draft. You can change these
            anytime.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <NewCollabPostForm siteId={siteId} teamSlug={teamSlug} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
