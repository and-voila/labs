import { Metadata } from 'next';
import Link from 'next/link';
import Balancer from 'react-wrap-balancer';

import { CP_PREFIX } from '#/lib/const';
import { cn } from '#/lib/utils';

import { Icons } from '#/components/shared/icons';
import { buttonVariants } from '#/components/ui/button';

const NotAuthorizedPage = () => {
  return (
    <main className=" relative isolate min-h-full min-w-full">
      <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Not Authorized
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
          A little bit Alexis
        </h1>
        <Balancer>
          <p className="mx-auto mt-4 max-w-2xl text-base sm:mt-6 lg:text-lg">
            Looks like you&apos;ve taken a wrong turn on the way to Café
            Tropical. A mistake you say? Contact Stevie at the front desk for
            assistance. Just don&apos;t ask for a wake-up call.
          </p>
        </Balancer>

        <div className="mt-10 flex justify-center">
          <Link
            href={`${CP_PREFIX}/settings/workspaces`}
            className={cn(buttonVariants())}
          >
            <Icons.caretLeft className="mr-2 h-4 w-4" />
            Get me out of here!
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotAuthorizedPage;

export function generateMetadata(): Metadata {
  const title = 'Not Authorized';
  const description =
    "Looks like you've taken a wrong turn into the Rose family's exclusive space. This area is for And Voila admins and mods. Please return to more familiar grounds.";

  const baseUrl =
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001';

  const ogImageUrl = new URL(`${baseUrl}/api/og`);
  ogImageUrl.searchParams.set('title', title);

  const pageUrl = `${baseUrl}/not-authorized`;

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
