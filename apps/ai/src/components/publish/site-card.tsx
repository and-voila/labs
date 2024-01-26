import { env } from '#/env';

import type { Site } from '@prisma/client';

import Link from 'next/link';

import { Icons } from '@av/ui/icons';
import { APP_BP } from '@av/utils';

import { placeholderBlurhash } from '#/lib/utils';

import BlurImage from '#/components/publish/blur-image';

interface SiteCardProps {
  data: Site;
  teamSlug: string;
}

export default function SiteCard({ data, teamSlug }: SiteCardProps) {
  const url = `${data.subdomain}.${env.NEXT_PUBLIC_ROOT_DOMAIN}`;
  return (
    <div
      key={data.name}
      className="group relative isolate flex flex-col justify-end overflow-hidden rounded-lg border px-4 pb-4 pt-48"
    >
      <Link href={`${APP_BP}/${teamSlug}/workspace/publish/site/${data.id}`}>
        <BlurImage
          src={data.image ?? '/site-placeholder.jpg'}
          alt={data.name ?? 'Card thumbnail'}
          width={500}
          height={400}
          className="absolute inset-0 -z-10 h-full w-full object-cover grayscale group-hover:grayscale-0"
          placeholder="blur"
          blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/60" />
        <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-background/10" />

        <div className="flex flex-wrap items-center gap-y-1 overflow-hidden">
          <div className="flex items-center gap-x-2">
            <div className="flex gap-x-1">
              <BlurImage
                width={48}
                height={48}
                src={data.logo ?? '/default-site-logo.jpg'}
                alt=""
                className="h-6 w-6 flex-none rounded-full bg-background/10 grayscale group-hover:grayscale-0"
                placeholder="blur"
                blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
              />
            </div>
            <h3 className="text-lg font-semibold leading-6 text-foreground">
              <span className="absolute inset-0" />
              {data.name}
            </h3>
          </div>
        </div>
      </Link>
      <div className="mt-2 flex w-full justify-between space-x-4">
        <a
          href={
            process.env.NEXT_PUBLIC_VERCEL_ENV
              ? `https://${url}`
              : `http://${data.subdomain}.localhost:3001`
          }
          target="_blank"
          rel="noreferrer"
          className="truncate rounded-md py-2 text-xs text-muted-foreground underline underline-offset-4 transition-colors group-hover:text-foreground"
        >
          <span className="flex flex-row items-center gap-1">
            {url}
            {''}
            <Icons.arrowSquareOut className="ml-1 h-3 w-3 text-muted-foreground transition-colors group-hover:text-foreground" />
          </span>
        </a>
      </div>
    </div>
  );
}
