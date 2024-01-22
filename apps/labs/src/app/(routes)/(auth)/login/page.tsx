import type { Metadata } from 'next';

import Link from 'next/link';

import { siteConfig } from '#/config/site';

import { SITE_URL } from '#/lib/const';
import { cn } from '#/lib/utils';

import UserAuthForm from '#/components/forms/user-auth-form';
import { Icons } from '#/components/shared/icons';
import { Logo } from '#/components/shared/logo-square';
import { buttonVariants } from '#/components/ui/button';

export function generateMetadata(): Metadata {
  const title = 'Login';
  const description = `Log in to ${siteConfig.name} Labs. Check out marketing playbooks, innovative AI tools, and join our community of digital marketing experts. Light your metrics up.`;

  const ogImageUrl = new URL(`${SITE_URL}/api/og`);
  ogImageUrl.searchParams.set('title', title);

  const pageUrl = `${SITE_URL}/login`;

  const metadata = {
    title,
    description,
    openGraph: {
      type: 'website',
      title,
      description,
      images: [
        {
          url: ogImageUrl.toString(),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      url: pageUrl,
    },
    twitter: {
      title,
      description,
      images: [
        {
          url: ogImageUrl.toString(),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };

  return metadata;
}

const LoginPage = () => {
  return (
    <div className="container flex min-h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: 'outline', size: 'sm' }),
          'absolute left-4 top-4 md:left-8 md:top-8',
        )}
      >
        <>
          <Icons.arrowLeft className="mr-2 h-4 w-4" />
          Home
        </>
      </Link>
      <div className="flex flex-1 flex-col justify-center py-12">
        <Link
          href="/register"
          className={cn(
            buttonVariants({ variant: 'outline', size: 'sm' }),
            'absolute right-4 top-4 md:right-8 md:top-8',
          )}
        >
          Register
        </Link>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex items-center justify-center p-6">
            <Logo fillOnHover className="h-6 md:h-8" />
            <sup className="-ml-2 font-mono text-xs text-primary md:-ml-3">
              beta
            </sup>
          </div>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <UserAuthForm />
          <p className="mx-auto mt-4 max-w-xs text-center text-sm text-muted-foreground">
            No credit card required. If you&apos;re interested, here&apos;s our
            <Link
              href="https://andvoila.gg/privacy"
              target="_blank"
              aria-label={`Navigate to ${siteConfig.name}'s Privacy Policy on their website in a new window`}
              className="text-primary hover:underline"
            >
              {' '}
              Privacy Policy{' '}
            </Link>
            and{' '}
            <Link
              href="https://andvoila.gg/terms"
              target="_blank"
              aria-label={`Navigate to ${siteConfig.name}'s Terms of Service on their website in a new window`}
              className="text-primary hover:underline"
            >
              Terms of Service
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
