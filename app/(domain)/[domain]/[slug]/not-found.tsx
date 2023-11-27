import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';

import { Icons } from '@/app/components/shared/icons';
import { buttonVariants } from '@/app/components/ui/button';
import { getSiteData } from '@/app/lib/fetchers';
import { cn } from '@/app/lib/utils';

export default async function NotFound() {
  const headersList = headers();
  const domain = headersList
    .get('host')
    ?.replace('.localhost:3001', `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);
  const data = await getSiteData(domain as string);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-sm= my-6 font-semibold uppercase tracking-widest">
        {data ? `${data.name}: ` : ''}404
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
          : "Blimey! You've found a page that doesn't exist."}
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
