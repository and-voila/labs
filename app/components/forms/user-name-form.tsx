'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import { useForm } from 'react-hook-form';

import { Icons } from '@/app/components/shared/icons';
import { buttonVariants } from '@/app/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { toast } from '@/app/components/ui/use-toast';
import { type FormData } from '@/app/lib/actions/update-user-name';
import { cn } from '@/app/lib/utils';
import { userNameSchema } from '@/app/lib/validations/user';

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user: Pick<User, 'id' | 'name'>;
}

export function UserNameForm({ user, className, ...props }: UserNameFormProps) {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userNameSchema),
    defaultValues: {
      name: user?.name || '',
    },
  });
  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  async function onSubmit(data: FormData) {
    setIsSaving(true);

    const response = await fetch(`/api/users/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
      }),
    });

    setIsSaving(false);

    if (!response?.ok) {
      return toast({
        title: 'Oh no, this again!?',
        description: 'Your name was not updated. Please try again.',
        variant: 'destructive',
      });
    }

    toast({
      title: 'Cool beans!',
      description: 'Your name has been updated.',
    });

    router.refresh();
  }

  return (
    <form
      className={cn(className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle>Your Name</CardTitle>
          <CardDescription>
            Please enter your full name or a display name you are comfortable
            with.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              className="w-[400px]"
              size={32}
              {...register('name')}
            />
            {errors?.name && (
              <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <button
            type="submit"
            className={cn(buttonVariants({ size: 'sm', variant: 'custom' }))}
            disabled={isSaving}
          >
            {isSaving && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>{isSaving ? 'Saving' : 'Save'}</span>
          </button>
        </CardFooter>
      </Card>
    </form>
  );
}
