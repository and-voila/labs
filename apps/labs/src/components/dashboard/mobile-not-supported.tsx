import Link from 'next/link';

import { cn } from '@and-voila/ui';

import { Icons } from '#/components/shared/icons';
import { buttonVariants } from '#/components/ui/button';

export const MobileNotSupported: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center sm:hidden">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: 'outline', size: 'sm' }),
          'absolute left-4 top-4 md:left-8 md:top-8',
        )}
      >
        <>
          <Icons.logo className="mr-2 h-4 w-4 text-primary" />
        </>
      </Link>
      <div className="relative h-full w-full bg-background" />
      <div className="bg-slate-850 absolute mx-8 flex flex-col items-center gap-6 rounded-lg px-8 py-10 text-center">
        <Icons.logo className="mr-2 h-16 w-16 text-primary" />
        <h2 className="text-3xl font-semibold">Better on larger screens</h2>
        <p className="text-muted-foreground">
          And Voila is best experienced on a larger screen. It has nothing to do
          with our cranky developer who can&apos;t center a div.
        </p>
        <p className="text-muted-foreground">
          Yell at{' '}
          <a
            className="mr-0.5 font-semibold text-alternate underline underline-offset-4"
            href="mailto:support@bril.la"
          >
            someone
          </a>
          ?
        </p>
      </div>
    </div>
  );
};
