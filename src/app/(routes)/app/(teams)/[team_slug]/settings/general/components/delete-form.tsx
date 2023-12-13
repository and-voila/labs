'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

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
} from '#/components/ui/alert-dialog';
import { Button } from '#/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '#/components/ui/card';
import { toast } from '#/components/ui/use-toast';

import { deleteTeam } from '../actions';

export interface DeleteFormProps {
  teamSlug: string;
}

export const DeleteForm: React.FC<DeleteFormProps> = (props) => {
  const { teamSlug } = props;

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const onConfirm = async () => {
    setIsSubmitting(true);

    try {
      await deleteTeam(teamSlug);
      toast({
        title: 'Success',
        description: 'Team deleted successfully.',
      });
      router.push('/app');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AlertDialog>
      <Card>
        <CardHeader>
          <CardTitle>Danger Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            You can delete your team at any time. This will permanently delete
            your team and <strong>all its related data</strong>.
          </p>
        </CardContent>

        <CardFooter className="py-3">
          <div className="ml-auto flex items-center justify-end">
            <AlertDialogTrigger asChild>
              <Button variant="outline">Delete Team</Button>
            </AlertDialogTrigger>
          </div>
        </CardFooter>
      </Card>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Yikes! Sure you want to delete your team?
          </AlertDialogTitle>
          <AlertDialogDescription>
            You&apos;re about to delete your team. That means it will vanish
            into thin air along with its data. This trick is permanent and
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isSubmitting} onClick={onConfirm}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
