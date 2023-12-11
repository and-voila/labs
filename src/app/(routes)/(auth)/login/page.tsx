import UserAuthForm from '#/components/forms/user-auth-form';
import { Logo } from '#/components/logo-square';
import { Icons } from '#/components/shared/icons';
import { buttonVariants } from '#/components/ui/button';
import { cn } from '#/lib/utils';
import { Metadata } from 'next';
import Link from 'next/link';

export function generateMetadata(): Metadata {
  const title = 'Login';
  const description =
    'Log in to Labs by And Voila. Check out marketing playbooks, innovative AI tools, and join our community of digital marketing experts. Light your metrics up.';

  const baseUrl =
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001';

  const ogImageUrl = new URL(`${baseUrl}/api/og`);
  ogImageUrl.searchParams.set('title', title);

  const pageUrl = `${baseUrl}/login`;

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
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
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
              aria-label="Naivgate to And Voila's Privacy Policy on their website in a new window"
              className="text-primary hover:underline"
            >
              {' '}
              Privacy Policy{' '}
            </Link>
            and{' '}
            <Link
              href="https://andvoila.gg/terms"
              target="_blank"
              aria-label="Naivgate to And Voila's Terms of Service on their website in a new window"
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
