'use client';

import type { User } from '@prisma/client';
import type { DisplayNameFormData } from '#/lib/actions/user/update-user';

import { useEffect, useState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { cn } from '@and-voila/ui';
import { buttonVariants } from '@and-voila/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@and-voila/ui/card';
import { Icons } from '@and-voila/ui/icons';
import { Input } from '@and-voila/ui/input';
import { Label } from '@and-voila/ui/label';
import { toast } from '@and-voila/ui/use-toast';

import { updateDisplayName } from '#/lib/actions/user/update-user';
import { displayNameSchema } from '#/lib/validations/display-name';

interface DisplayNameFormProps {
  user: Pick<User, 'id' | 'displayName'>;
}

export function DisplayNameForm({ user }: DisplayNameFormProps) {
  const [isPending, startTransition] = useTransition();
  const updateDisplayNameWithId = updateDisplayName.bind(null, user.id);

  const {
    handleSubmit,
    register,
    formState: { errors, isValid, isDirty },
    watch,
  } = useForm<DisplayNameFormData>({
    mode: 'onChange',
    resolver: zodResolver(displayNameSchema),
    defaultValues: {
      displayName: user?.displayName ?? '',
    },
  });

  const [inputColor, setInputColor] = useState('text-muted-foreground');

  const watchedDisplayName = watch('displayName');

  useEffect(() => {
    if (watchedDisplayName !== user.displayName) {
      setInputColor('text-foreground');
    } else {
      setInputColor('text-muted-foreground');
    }
  }, [watchedDisplayName, user.displayName]);

  const displayName = watch('displayName');
  const transformedDisplayName = displayName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

  const onSubmit = handleSubmit((data) => {
    startTransition(async () => {
      const { status } = await updateDisplayNameWithId(data);

      if (status !== 'success') {
        toast({
          title: 'Your display name was not updated',
          description:
            "Something broke and we couldn't update your display name. Please try again.",
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Your display name was updated',
          description: "Your display name has been updated and you're all set.",
          variant: 'success',
        });
      }
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Your display name</CardTitle>
          <CardDescription>
            This name? It&apos;s for the outside world to see.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="displayName">
              Display Name
            </Label>
            <Input
              id="displayName"
              className={`w-full bg-background sm:w-[400px] ${inputColor}`}
              size={32}
              {...register('displayName')}
            />
            <p className="my-2 text-sm text-muted-foreground">
              Your display name will appear as:{' '}
              <span className="font-medium text-primary">
                @{transformedDisplayName}
              </span>
            </p>
            {errors?.displayName && (
              <p className="px-1 text-xs text-red-600">
                {errors.displayName.message}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <button
            type="submit"
            className={cn(buttonVariants({ size: 'sm' }))}
            disabled={isPending || !isValid || !isDirty}
          >
            {isPending && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>{isPending ? 'Saving' : 'Save'}</span>
          </button>
        </CardFooter>
      </Card>
    </form>
  );
}
