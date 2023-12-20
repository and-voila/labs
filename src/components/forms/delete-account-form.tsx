'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Team } from '@prisma/client';

import { siteConfig } from '#/config/site';

import { deletePersonalAccount } from '#/lib/actions/user/update-user';
import { APP_BP } from '#/lib/const';

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
import { Button, buttonVariants } from '#/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '#/components/ui/card';

export interface DeleteAccountFormProps {
  teams: Team[];
}

export const DeleteAccountForm: React.FC<DeleteAccountFormProps> = (props) => {
  const { teams } = props;

  const router = useRouter();

  const onDeleteConfirm = async () => {
    await deletePersonalAccount();
    router.refresh();
  };

  return (
    <AlertDialog>
      <Card className="border border-destructive">
        <CardHeader>
          <CardTitle>Delete Account</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm font-normal leading-6 text-muted-foreground">
            Permanently remove your{' '}
            <strong className="font-semibold text-foreground">
              Personal Account
            </strong>{' '}
            and all of its contents from{' '}
            <strong className="font-semibold text-foreground">
              {siteConfig.name}
            </strong>
            . This action is not reversible, so please continue with caution.
          </p>
        </CardContent>
        <CardFooter className="py-3">
          <div className="ml-auto flex items-center justify-end">
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Personal Account</Button>
            </AlertDialogTrigger>
          </div>
        </CardFooter>
      </Card>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Personal Account</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div>
              {teams.length > 0 ? (
                <div>
                  You have access to <strong>{teams.length} Teams.</strong> You
                  must leave or delete them before you can delete your Personal
                  Account.
                </div>
              ) : (
                <span>
                  Are you sure you want to delete your Personal Account? This
                  action is not reversible, so please continue with caution.
                </span>
              )}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        {teams.length > 0 && (
          <div className="-mx-6 max-h-[50vh] max-w-lg space-y-4 overflow-auto border-t bg-muted p-6">
            {teams.map((team) => (
              <Card key={team.id}>
                <CardContent className="flex items-center justify-between p-4">
                  <div className="truncate text-sm font-semibold">
                    {team.name}
                  </div>
                  <Link
                    href={`${APP_BP}/${team.slug}/workspace/settings`}
                    className={buttonVariants({
                      variant: 'secondary',
                      size: 'sm',
                    })}
                  >
                    Settings
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {teams.length > 0 ? null : (
            <AlertDialogAction onClick={onDeleteConfirm}>
              Confirm
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
