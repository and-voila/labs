'use client';

import { useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import { useForm } from 'react-hook-form';

import { siteConfig } from '#/config/site';

import { updateUserName, type FormData } from '#/lib/actions/update-user';
import { cn } from '#/lib/utils';
import { userNameSchema } from '#/lib/validations/user';

import { Icons } from '#/components/shared/icons';
import { buttonVariants } from '#/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '#/components/ui/card';
import { Input } from '#/components/ui/input';
import { Label } from '#/components/ui/label';
import { toast } from '#/components/ui/use-toast';

interface UserNameFormProps {
  user: Pick<User, 'id' | 'name'>;
}

export function UserNameForm({ user }: UserNameFormProps) {
  const [isPending, startTransition] = useTransition();
  const updateUserNameWithId = updateUserName.bind(null, user.id);

  const {
    handleSubmit,
    register,
    formState: { errors, isValid, isDirty },
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: zodResolver(userNameSchema),
    defaultValues: {
      name: user?.name || '',
    },
  });

  const onSubmit = handleSubmit((data) => {
    startTransition(async () => {
      const { status } = await updateUserNameWithId(data);

      if (status !== 'success') {
        toast({
          title: 'Your name was not updated',
          description:
            "Something broke and we couldn't update your name. Apologies! Please try again.",
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Your name was updated',
          description: `Thanks for making ${siteConfig.name} yours. Your name has been updated and you're all set.`,
          variant: 'success',
        });
      }
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Your name</CardTitle>
          <CardDescription>
            Please use your real name here. It&apos;s private and will not be
            visible to others.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              className="w-full bg-background sm:w-[400px]"
              size={32}
              {...register('name')}
            />
            {errors?.name && (
              <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
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
