import { Metadata } from 'next';
import Link from 'next/link';

import { Logo } from '@/app/components/logo-square';
import { buttonVariants } from '@/app/components/ui/button';
import UserAuthForm from '@/app/components/user-auth-form';
import { cn } from '@/app/lib/utils';

export const metadata: Metadata = {
  title: 'Register Account',
  description:
    'Unlock your marketing potential with And Voila. Create a free account for access to exclusive playbooks, AI tools, and a vibrant community of experts.',
};

export default function RegisterPage() {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <Link
          href="/login"
          className={cn(
            buttonVariants({ variant: 'outline', size: 'sm' }),
            'absolute right-6 top-6 md:right-10 md:top-10',
          )}
        >
          Log in
        </Link>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex items-center justify-center p-6">
            <Logo fillOnHover className="h-6 md:h-8" />
            <sup className="-ml-2 font-mono text-xs text-brand md:-ml-3">
              beta
            </sup>
          </div>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <UserAuthForm isRegistration />
          <p className="mx-auto mt-4 max-w-xs text-center text-sm text-muted-foreground">
            No credit card required. If you&apos;re interested, here&apos;s our
            <Link
              href="https://andvoila.gg/privacy"
              target="_blank"
              aria-label="Naivgate to And Voila's Privacy Policy on their website in a new window"
              className="text-brand hover:underline"
            >
              {' '}
              Privacy Policy{' '}
            </Link>
            and{' '}
            <Link
              href="https://andvoila.gg/terms"
              target="_blank"
              aria-label="Naivgate to And Voila's Terms of Service on their website in a new window"
              className="text-brand hover:underline"
            >
              Terms of Service
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
}
