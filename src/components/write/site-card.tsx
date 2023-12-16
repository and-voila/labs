import Link from 'next/link';
import { Site } from '@prisma/client';

import { APP_BP } from '#/lib/const';
import { placeholderBlurhash } from '#/lib/utils';

import { Icons } from '#/components/shared/icons';
import BlurImage from '#/components/write/blur-image';

export default function SiteCard({ data }: { data: Site }) {
  const url = `${data.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
  return (
    <div className="relative rounded-lg border border-border bg-card pb-10 shadow-md transition-all hover:shadow-xl">
      <Link
        href={`${APP_BP}/tools/write/site/${data.id}`}
        className="flex flex-col overflow-hidden rounded-lg"
      >
        <BlurImage
          alt={data.name ?? 'Card thumbnail'}
          width={500}
          height={400}
          className="h-44 object-cover grayscale hover:grayscale-0"
          src={data.image ?? '/site-placeholder.jpg'}
          placeholder="blur"
          blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
        />
        <div className="border-t p-4">
          <h3 className="my-0 truncate text-lg font-semibold">{data.name}</h3>
          <p className="mt-2 line-clamp-1 text-sm leading-snug text-muted-foreground">
            {data.description}
          </p>
        </div>
      </Link>
      <div className="absolute bottom-4 flex w-full justify-between space-x-4 px-4">
        <a
          href={
            process.env.NEXT_PUBLIC_VERCEL_ENV
              ? `https://${url}`
              : `http://${data.subdomain}.localhost:3001`
          }
          target="_blank"
          rel="noreferrer"
          className="truncate rounded-md bg-muted-foreground/20 px-2 py-1 font-mono text-xs text-foreground transition-colors hover:opacity-70"
        >
          <span className="flex flex-row items-center gap-1">
            {url}
            {''}
            <Icons.arrowSquareOut className="ml-1 h-3 w-3" />
          </span>
        </a>
      </div>
    </div>
  );
}
