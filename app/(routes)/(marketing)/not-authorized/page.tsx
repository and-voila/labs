import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { Icons } from '@/app/components/shared/icons';
import { buttonVariants } from '@/app/components/ui/button';
import { cn } from '@/app/lib/utils';

export const metadata: Metadata = {
  title: 'Unauthorized Access',
  description:
    "Looks like you've taken a wrong turn into the Rose family's exclusive space. This area is for admins. Please return to more familiar grounds or seek assistance.",
};

const NotAuthorizedPage = () => {
  return (
    <main className="relative isolate h-screen">
      <Image
        src="/images/not-authorized.avif"
        alt="A photo of a bus in the middle of nowhere."
        className="object-fit absolute inset-0 -z-10 h-full w-full object-top grayscale"
        width={3050}
        height={2440}
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
      </div>
    </main>
  );
};

export default NotAuthorizedPage;
