'use client';

import { useState } from 'react';
import Link from 'next/link';

import { cn } from '@/app/lib/utils';

import { Icons } from '../shared/icons';
import { buttonVariants } from '../ui/button';

export default function CTA() {
  const [closeCTA, setCloseCTA] = useState(false);
  return (
    <div
      className={`${
        closeCTA ? 'h-14 lg:h-auto' : 'h-48 sm:h-40 lg:h-auto'
      } fixed inset-x-0 bottom-5 mx-5 mb-16 flex max-w-screen-xl flex-col items-center justify-between space-y-3 rounded-lg border bg-primary-foreground px-5 pb-3 pt-0 drop-shadow-lg transition-all duration-150 ease-in-out lg:flex-row lg:space-y-0 lg:pt-3 xl:mx-auto`}
    >
      <button
        onClick={() => setCloseCTA(!closeCTA)}
        className={`${
          closeCTA ? 'rotate-180' : 'rotate-0'
        } absolute right-2 top-3 text-brand transition-all duration-150 ease-in-out lg:hidden`}
      >
        <Icons.radixChevronDown className="h-6 w-6" />
      </button>
      <div className="text-center lg:text-left">
        <p className="text-lg font-bold text-foreground sm:text-2xl">
          Ready to build your own site in 3 minutes?
        </p>
        <p
          className={`${
            closeCTA ? 'hidden lg:block' : ''
          } mt-2 text-sm text-muted-foreground lg:mt-0 lg:max-w-3xl lg:text-base`}
        >
          This demo showcases the ease of creating a personalized site with And
          Voila. Secure a custom domain and take full ownership of your content.
        </p>
      </div>

      <div
        className={`${
          closeCTA ? 'hidden lg:flex' : ''
        } flex w-full flex-col space-y-3 text-center sm:flex-row sm:space-x-3 sm:space-y-0 lg:w-auto`}
      >
        <Link
          href="https://labs.andvoila.gg/register"
          rel="noreferrer"
          target="_blank"
          className={cn(
            buttonVariants({ variant: 'custom', size: 'lg' }),
            'ml-4 flex-shrink-0 py-4 sm:mx-auto',
          )}
        >
          Start for free
        </Link>
      </div>
    </div>
  );
}
