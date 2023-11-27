'use client';

import { useTransition } from 'react';
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
import {
  updateUserName,
  type FormData,
} from '@/app/lib/actions/update-user-name';
import { cn } from '@/app/lib/utils';
import { userNameSchema } from '@/app/lib/validations/user';

interface UserNameFormProps {
  user: Pick<User, 'id' | 'name'>;
}

export function UserNameForm({ user }: UserNameFormProps) {
  const [isPending, startTransition] = useTransition();
  const updateUserNameWithId = updateUserName.bind(null, user.id);

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
          description:
            "Thanks for making And Voila yours. Your name has been updated and you're all set.",
          variant: 'success',
        });
      }
    });
  });

  return (
    <form onSubmit={onSubmit}>
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
              className="w-full sm:w-[400px]"
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
            className={cn(buttonVariants({ size: 'sm' }))}
            disabled={isPending}
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
