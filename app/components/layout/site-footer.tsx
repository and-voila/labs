import * as React from 'react';

import { ModeToggle } from '@/app/components/layout/mode-toggle';
import { Icons } from '@/app/components/shared/icons';
import { siteConfig } from '@/app/config/site';
import { cn } from '@/app/lib/utils';

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
  const copyrightName = siteConfig.company || siteConfig.name || '';

  return (
    <footer className={`${cn(className)} bg-card`}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-20 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 text-sm md:flex-row md:gap-2 md:px-0">
          <Icons.logo className="mr-2 h-7 text-brand" />
          <p>
            &copy; {copyrightDate} {copyrightName}
            {copyrightName.length && !copyrightName.endsWith('.')
              ? '.'
              : ''}{' '}
            All rights reserved.
          </p>
          <hr className="mx-4 hidden h-4 w-[1px] border-l border-brand md:inline-block" />
          <p>
            Designed in California by{' '}
            <a
              href="https://bril.la"
              aria-label="Navigate to BRIL.LA website"
              target="_blank"
              rel="noopener"
              className="font-medium text-brand hover:underline hover:underline-offset-4"
            >
              {' '}
              BRIL.LA
            </a>
          </p>
          <p />
          <p className="mr-4 md:ml-auto">
            Powered by{' '}
            <a
              href="https://vercel.com/brilla"
              aria-label="Navigate to BRIL.LA profile on Vercel"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline hover:underline-offset-4"
            >
              Vercel
            </a>
          </p>
        </div>
        <ModeToggle />
      </div>
    </footer>
  );
}
