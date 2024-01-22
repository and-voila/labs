'use client';

import React, { useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Team } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { deletePersonalAccount } from '#/lib/actions/user/update-user';
import { APP_BP } from '#/lib/const';
import { User } from '#/lib/types/next-auth';

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

import { Input } from '../ui/input';
import { Label } from '../ui/label';

export interface DeleteAccountFormProps {
  teams: Team[];
  user: User;
}

export const DeleteAccountForm: React.FC<DeleteAccountFormProps> = (props) => {
  const { teams, user } = props;

  const accountNameSchema = z.object({
    accountName: z
      .string()
      .refine((name) => name === user.name || name === user.displayName, {
        message: "Account name doesn't match",
      }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(accountNameSchema),
  });

  const router = useRouter();

  const handleDeleteConfirm = useCallback(async () => {
    await deletePersonalAccount();
    router.refresh();
  }, [router]);

  return (
    <form onSubmit={handleSubmit(handleDeleteConfirm)}>
      <AlertDialog>
        <Card className="border-2 border-destructive">
          <CardHeader>
            <CardTitle>Delete Account</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-1">
              <p className="pb-4 text-sm font-normal leading-6 text-muted-foreground">
                Is it really goodbye? If you&apos;re set on making your personal
                account a thing of the past, just type your account name:{' '}
                <span className="font-semibold text-foreground">
                  {user.name || user.displayName}
                </span>
                , right here. Once you hit delete, it&apos;s like unseeing a
                funny cat video...impossible. So, double-check before you leave
                us in tears.
              </p>
              <Label className="sr-only" htmlFor="accountName">
                Account Name
              </Label>
              <Input
                id="accountName"
                placeholder="Your account name"
                className="w-full bg-background sm:w-[400px]"
                {...register('accountName')}
              />
              {errors?.accountName &&
                typeof errors.accountName.message === 'string' && (
                  <p className="px-1 text-xs text-red-600">
                    {errors.accountName.message}
                  </p>
                )}
            </div>
          </CardContent>
          <CardFooter className="py-3">
            <div className="ml-auto flex items-center justify-end">
              <AlertDialogTrigger asChild>
                <Button variant="destructive" disabled={!isValid}>
                  Delete Personal Account
                </Button>
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
                    You have access to <span>{teams.length} Teams.</span> You
                    must leave or delete them before you can delete your
                    Personal Account.
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
              <AlertDialogAction onClick={handleDeleteConfirm}>
                Confirm
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </form>
  );
};
