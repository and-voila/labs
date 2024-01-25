import type { NextPage } from 'next';

import Link from 'next/link';

import { cn } from '@and-voila/ui';
import { buttonVariants } from '@and-voila/ui/button';
import { Icons } from '@and-voila/ui/icons';
import { APP_BP } from '@and-voila/utils';

import Sith404 from '#/components/layout/sith-404';

const PostIdNotFound: NextPage = () => {
  return (
    <div className="relative min-h-screen w-full">
      <div className="lg:grid lg:grid-cols-12">
        <div className="items-start lg:col-span-5 lg:px-0 xl:col-span-6">
          <Sith404 />
        </div>
        <div className="relative lg:col-span-7 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
          <div className="max-w-xl lg:mx-0">
            <div className="hidden sm:mt-32 sm:flex lg:mt-16">
              <div className="mb-6 text-sm font-semibold uppercase tracking-widest text-primary">
                404
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              You just had to click there...
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              I was busy mastering the dark side. Now, something is broken and I
              have to find the right path. Try another click, but this time,
              click me.
            </p>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              BTW, that{' '}
              <span className="font-semibold text-foreground">
                post does&apos;t exist
              </span>
              , or you{' '}
              <span className="font-semibold text-foreground">
                don&apos;t have permission
              </span>{' '}
              to view it.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                href={`${APP_BP}/my/workspaces`}
                className={cn(buttonVariants())}
              >
                Back to safety
              </Link>
              <Link
                href={`${APP_BP}/my/support`}
                className={cn(
                  buttonVariants({ variant: 'link' }),
                  'text-alternate',
                )}
              >
                Help
                <Icons.arrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostIdNotFound;
