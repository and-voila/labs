'use client';

import type { z } from 'zod';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
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
import { ToastAction } from '@and-voila/ui/toast';
import { toast } from '@and-voila/ui/use-toast';

import { siteConfig } from '#/config/site';

import { userAuthSchema } from '#/lib/validations/auth';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  isRegistration?: boolean;
  token?: string;
}

type FormData = z.infer<typeof userAuthSchema>;

export function UserAuthForm({
  className,
  isRegistration,
  token,
  ...props
}: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isDiscordLoading, setIsDiscordLoading] =
    React.useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false);
  const searchParams = useSearchParams();

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    // TODO: Checks for existing user only work for email provider

    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: data.email.toLowerCase() }),
    });
    const { exists } = await res.json();

    if (!isRegistration && !exists) {
      setIsLoading(false);
      return toast({
        title: 'No account found',
        description:
          "We couldn't find an account with that email. If you have one, please try again. Or, create a new account using the register page.",
        variant: 'destructive',
        action: <ToastAction altText="Try again">OK</ToastAction>,
      });
    }

    if (isRegistration && exists) {
      setIsLoading(false);
      return toast({
        title: 'Account already exists',
        description:
          'An account with this email already exists. Did you mean to log in instead? If so, please use the Login form.',
        variant: 'destructive',
        action: <ToastAction altText="Log in">Log in</ToastAction>,
      });
    }

    let callbackUrl = searchParams.get('from') ?? '/';
    if (token) {
      callbackUrl = `/invitations/${token}`;
    }

    const signInResult = await signIn('email', {
      email: data.email.toLowerCase(),
      redirect: false,
      callbackUrl,
    });

    setIsLoading(false);

    if (!signInResult?.ok) {
      return toast({
        title: 'Unable to process log in request',
        description: 'Your log in  request failed. Please try again.',
        variant: 'destructive',
      });
    }

    return toast({
      title: 'Log in pending, please check your email',
      description:
        "We sent you a magic link. Click it to get instant access. Be sure to check your spam folder if you can't find it.",
      variant: 'success',
    });
  }

  const handleDiscordSignIn = React.useCallback(() => {
    setIsDiscordLoading(true);
    void signIn('discord');
  }, []);

  const handleGoogleSignIn = React.useCallback(() => {
    setIsGoogleLoading(true);
    void signIn('google');
  }, []);

  return (
    <div className={cn('max-w-sm', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {token && <input type="hidden" value={token} {...register('token')} />}
        <Card className="py-6">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">
              {isRegistration ? 'Create your free account' : 'Welcome back'}
            </CardTitle>
            <CardDescription>
              {isRegistration
                ? 'Create an account with Discord, Google, or email. Then check your inbox for a magic link.'
                : "Use Discord, Google, or enter your email and we'll send you a magic link."}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-6 py-2">
              <button
                type="button"
                className={cn(buttonVariants())}
                onClick={handleDiscordSignIn}
                disabled={isLoading || isDiscordLoading}
              >
                {isDiscordLoading ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Icons.discord className="mr-2 h-5 w-5" />
                )}{' '}
                Discord
              </button>
              <button
                type="button"
                className={cn(buttonVariants())}
                onClick={handleGoogleSignIn}
                disabled={isLoading || isGoogleLoading}
              >
                {isGoogleLoading ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Icons.google className="mr-2 h-5 w-5" />
                )}{' '}
                Google
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-primary/70" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="frida@kahlo.com"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading || isGoogleLoading || isDiscordLoading}
                {...register('email')}
              />
              {errors?.email && (
                <p className="px-1 text-xs text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <button
              className={cn('w-full', buttonVariants({ variant: 'secondary' }))}
              disabled={isLoading}
            >
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isRegistration ? 'Register with email' : 'Log in with email'}
            </button>
            {!isRegistration ? (
              <p className="text-xs text-muted-foreground">
                Don&apos;t have an account? No sweat,{' '}
                <Link
                  href="/register"
                  aria-label={`Navigate to ${siteConfig.name}'s Registration page to create an account.`}
                  className="font-semibold text-primary hover:underline"
                >
                  create one
                </Link>
                .
              </p>
            ) : (
              <p className="text-xs text-muted-foreground">
                Already have an account? Awesome,{' '}
                <Link
                  href="/login"
                  aria-label={`Navigate to ${siteConfig.name}'s Login page to create an account.`}
                  className="font-semibold text-primary hover:underline"
                >
                  log in now
                </Link>
                .
              </p>
            )}
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

export default UserAuthForm;
