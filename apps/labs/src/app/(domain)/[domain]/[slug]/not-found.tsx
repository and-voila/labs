import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';

import { env } from 'env';

import { getSiteData } from '#/lib/operations/publish/publish-fetchers';
import { cn } from '#/lib/utils';

import { Icons } from '#/components/shared/icons';
import { buttonVariants } from '#/components/ui/button';

export default async function NotFound() {
  const headersList = headers();
  const domain = headersList
    .get('host')
    ?.replace('.localhost:3001', `.${env.NEXT_PUBLIC_ROOT_DOMAIN}`);
  const data = await getSiteData(domain as string);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="my-6 text-sm font-semibold uppercase tracking-widest text-primary">
        {data ? `${data.name} ` : ''}404
      </h1>
      <Image
        alt="missing site"
        src="/images/404-dogs.jpg"
        width={400}
        height={400}
        className="rounded-lg shadow"
      />
      <div className="mt-4 text-xs text-muted-foreground">
        Photo by{' '}
        <a
          href="https://unsplash.com/@karsten116?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold"
        >
          Karsten Winegeart
        </a>{' '}
        on{' '}
        <a
          href="https://unsplash.com/photos/brown-and-white-dog-wearing-pink-and-black-polka-dot-dress-qy0BHykaq0E?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
          target="_blank"
          rel="noopener noreferrer"
        >
          Unsplash
        </a>
      </div>
      <p className="my-6 text-lg text-foreground lg:text-xl">
        {data
          ? data.message404
          : 'Woof! The hoomans who built this site broke something.'}
      </p>
      <div className="mt-10 flex justify-center">
        <Link href="/" className={cn(buttonVariants({ variant: 'outline' }))}>
          <Icons.caretLeft className="mr-2 h-4 w-4" />
          Back to the homepage
        </Link>
      </div>
    </div>
  );
}
