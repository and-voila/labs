'use client';

import type { Team } from '#/lib/operations/teams/get-teams';

import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@and-voila/ui/alert-dialog';
import { Button } from '@and-voila/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@and-voila/ui/card';
import { Input } from '@and-voila/ui/input';
import { Label } from '@and-voila/ui/label';
import { toast } from '@and-voila/ui/use-toast';
import { APP_BP } from '@and-voila/utils';

import { deleteTeam } from '#/lib/actions/teams/delete-team';

export interface DeleteFormProps {
  teamSlug: string;
  team: Team;
}

export const DeleteForm: React.FC<DeleteFormProps> = (props) => {
  const { teamSlug, team } = props;

  const teamNameSchema = z.object({
    teamName: z.string().refine((name) => name === team.name, {
      message: "Team name doesn't match",
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(teamNameSchema),
  });

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const onConfirm = useCallback(async () => {
    setIsSubmitting(true);

    try {
      await deleteTeam(teamSlug);
      toast({
        title: 'Your team was deleted',
        description:
          'Your request was processed and your team has been permanently deleted.',
        variant: 'success',
      });

      router.push(`${APP_BP}/my/workspaces`);
    } finally {
      setIsSubmitting(false);
    }
  }, [teamSlug, router]);

  return (
    <form onSubmit={handleSubmit(onConfirm)}>
      <AlertDialog>
        <Card className="border border-destructive">
          <CardHeader>
            <CardTitle>Danger Zone</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-1">
              <p className="pb-4 text-sm font-normal leading-6 text-muted-foreground">
                Say goodbye to
                <span className="font-semibold"> {team.name}</span> by typing
                the team&apos;s name. It&apos;s like hitting the eject button on
                your own spaceship, thrilling, but final.
              </p>

              <Label className="sr-only" htmlFor="teamName">
                Team Name
              </Label>
              <Input
                id="teamName"
                placeholder="Your team name"
                className="w-full bg-background sm:w-[400px]"
                {...register('teamName')}
              />
              {errors?.teamName &&
                typeof errors.teamName.message === 'string' && (
                  <p className="px-1 text-xs text-red-600">
                    {errors.teamName.message}
                  </p>
                )}
            </div>
          </CardContent>

          <CardFooter className="py-3">
            <div className="ml-auto flex items-center justify-end">
              <AlertDialogTrigger asChild>
                <Button variant="destructive" disabled={!isValid}>
                  Delete workspace
                </Button>
              </AlertDialogTrigger>
            </div>
          </CardFooter>
        </Card>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Yikes! Sure you want to delete your team workspace?
            </AlertDialogTitle>
            <AlertDialogDescription>
              You&apos;re about to delete your team workspace. That means it
              will vanish into thin air along with its data. This trick is
              permanent and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitting}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction disabled={isSubmitting} onClick={onConfirm}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </form>
  );
};
