import { env } from '#/env';

import type { Post, Site } from '@prisma/client';

import Image from 'next/image';
import Link from 'next/link';

import { Icons } from '@av/ui/icons';
import { APP_BP } from '@av/utils';

import { placeholderBlurhash } from '#/lib/utils';

import BlurImage from '#/components/publish/blur-image';

interface PostCardProps {
  data: Post & { site: Site | null };
  teamSlug: string;
}

export default function PostCard({ data, teamSlug }: PostCardProps) {
  const url = `${data.site?.subdomain}.${env.NEXT_PUBLIC_ROOT_DOMAIN}/${data.slug}`;

  return (
    <div className="group relative rounded-xl border bg-card pb-10 shadow">
      <Link
        href={`${APP_BP}/${teamSlug}/workspace/publish/post/${data.id}`}
        className="flex w-72 flex-col overflow-hidden rounded-lg"
      >
        <div className="relative h-44 overflow-hidden">
          <BlurImage
            alt={data.title ?? 'Card thumbnail'}
            width={500}
            height={400}
            className="h-44 object-cover transition-colors  group-hover:grayscale"
            src={data.image ?? '/post-placeholder.jpg'}
            placeholder="blur"
            blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
          />
        </div>
        <div className="space-y-2 p-4">
          <div className="flex flex-row items-center justify-between gap-x-2">
            <div className="flex gap-x-1">
              <Image
                width={48}
                height={48}
                src={data.site?.logo ?? '/default-site-logo.jpg'}
                alt=""
                className="h-5 w-5 flex-none rounded-full bg-background/10 transition-colors group-hover:grayscale"
                placeholder="blur"
                blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
              />
              <h3 className="truncate text-sm font-semibold leading-6 text-primary transition-colors group-hover:text-muted-foreground">
                <span className="absolute inset-0" />
                {data.site?.name}
              </h3>
            </div>
            <Icons.file className="h-5 w-5 text-alternate" aria-hidden="true" />
          </div>
          <h3 className="my-0 line-clamp-2 text-balance text-lg font-semibold leading-6 text-foreground">
            {data.title ?? 'Draft post without a title'}
          </h3>
        </div>
      </Link>
      {data.published ? (
        <div className="absolute bottom-4 flex w-full px-4">
          <a
            href={
              process.env.NEXT_PUBLIC_VERCEL_ENV
                ? `https://${url}`
                : `http://${data.site?.subdomain}.localhost:3001/${data.slug}`
            }
            target="_blank"
            rel="noreferrer"
            className="truncate rounded-md py-2 text-sm text-alternate underline underline-offset-4 transition-colors group-hover:text-alternate/80"
          >
            <span className="flex flex-row items-center gap-1">
              Visit post
              {''}
              <Icons.arrowSquareOut
                className="ml-1 h-4 w-4 text-alternate"
                aria-hidden="true"
              />
            </span>
          </a>
        </div>
      ) : (
        <span className="absolute bottom-4 mx-4 rounded-sm border border-muted-foreground px-1 text-sm font-medium text-muted-foreground">
          Draft
        </span>
      )}
    </div>
  );
}
