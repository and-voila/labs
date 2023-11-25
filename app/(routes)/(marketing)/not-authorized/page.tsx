import { Metadata } from 'next';
import Link from 'next/link';

import { Icons } from '@/app/components/shared/icons';
import { buttonVariants } from '@/app/components/ui/button';
import BlurImage from '@/app/components/write/blur-image';
import { cn, placeholderBlurhash } from '@/app/lib/utils';

const NotAuthorizedPage = () => {
  return (
    <main className="relative isolate h-screen">
      <BlurImage
        src="/images/bus-nowhere.jpg"
        alt="A photo of a bus in the middle of nowhere."
        className="absolute inset-0 -z-10 h-full w-full object-cover object-top grayscale"
        width={1920}
        height={1536}
        priority
        blurDataURL={placeholderBlurhash}
        role="img"
      />
      <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-widest">
          Oopsie-Daisy
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
          A Little Bit Alexis
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base sm:mt-6 lg:text-lg">
          Looks like you&apos;ve taken a wrong turn on the way to the Café
          Tropical. A mistake you say? Contact Stevie at the front desk for
          assistance. Just don&apos;t ask her for a wake-up call.
        </p>
        <div className="mt-10 flex justify-center">
          <Link
            href="/dashboard"
            className={cn(buttonVariants({ variant: 'custom' }))}
          >
            <Icons.caretLeft className="mr-2 h-4 w-4" />
            Get me out of here!
          </Link>
        </div>
        <div className="mt-6 text-xs">
          Photo by{' '}
          <a
            href="https://unsplash.com/@thebethanyrandall?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold"
          >
            Bethany Randall
          </a>{' '}
          on{' '}
          <a
            href="https://unsplash.com/photos/white-and-red-bus-near-mountain-AJ34jnrB52A?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
            target="_blank"
            rel="noopener noreferrer"
          >
            Unsplash
          </a>
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
