'use client';

import type { IconKey } from '#/lib/types';

import { useCallback } from 'react';
import Link from 'next/link';

import { Button } from '@av/ui/button';
import { Icons } from '@av/ui/icons';
import { APP_BP } from '@av/utils';

import { siteConfig } from '#/config/site';

const links: {
  name: string;
  href: string;
  description: string;
  icon: IconKey;
}[] = [
  {
    name: 'Admin dashboard',
    href: `${APP_BP}/my/admin`,
    description: `Your command center for everything ${siteConfig.name}. Navigate like a pro.`,
    icon: 'dashboard',
  },
  {
    name: 'Spank the developer',
    href: `${APP_BP}/my/support`,
    description:
      'Just ping Sam or the crew and send them some questionable karma.',
    icon: 'help',
  },
];

export default function AdminError({ reset }: { reset: () => void }) {
  const handleReset = useCallback(() => {
    reset();
  }, [reset]);

  return (
    <main className="mx-auto w-full max-w-7xl px-6 pb-16 pt-10 sm:pb-24 lg:px-8">
      <div className="mx-auto mt-20 max-w-2xl text-center sm:mt-24">
        <p className="text-base font-medium uppercase leading-8 tracking-widest text-primary">
          Error
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
          Whoops, tech hiccup
        </h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground sm:mt-6 sm:text-lg sm:leading-8">
          Looks like our tech just tripped over its own feet. We&apos;re on it,
          so hang tight. Thanks for your patience.
        </p>
      </div>
      <div className="mx-auto mt-16 flow-root max-w-lg sm:mt-20">
        <h2 className="sr-only">Popular pages</h2>
        <ul className="-mt-6 divide-y divide-border border-b">
          {links.map((link, linkIdx) => {
            const Icon = Icons[link.icon as keyof typeof Icons];
            return (
              <li key={linkIdx} className="relative flex gap-x-6 py-6">
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg shadow-sm">
                  <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <div className="flex-auto">
                  <h3 className="text-sm font-semibold leading-6">
                    <Link
                      href={link.href}
                      aria-label={`Navigate to ${link.name}page.`}
                    >
                      <span className="absolute inset-0" aria-hidden="true" />
                      {link.name}
                    </Link>
                  </h3>
                  <p className="mt-2 leading-6 text-muted-foreground">
                    {link.description}
                  </p>
                </div>
                <div className="flex-none self-center">
                  <Icons.caretRight
                    className="h-5 w-5 text-primary"
                    aria-hidden="true"
                  />
                </div>
              </li>
            );
          })}
        </ul>
        <div className="mt-10 flex justify-center">
          <Button type="submit" variant="default" onClick={handleReset}>
            Try again
          </Button>
        </div>
      </div>
    </main>
  );
}
