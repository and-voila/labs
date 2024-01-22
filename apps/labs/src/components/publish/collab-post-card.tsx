import { env } from '#/env';

import type { Post, Site } from '@prisma/client';

import Image from 'next/image';
import Link from 'next/link';

import { APP_BP } from '#/lib/const';
import { placeholderBlurhash } from '#/lib/utils';

import BlurImage from '#/components/publish/blur-image';
import { Icons } from '#/components/shared/icons';

interface CollabPostCardProps {
  data: Post & { site: Site | null };
  teamSlug: string;
}

export default function CollabPostCard({
  data,
  teamSlug,
}: CollabPostCardProps) {
  const url = `${data.site?.subdomain}.${env.NEXT_PUBLIC_ROOT_DOMAIN}/${data.slug}`;

  return (
    <div className="group relative rounded-lg border bg-card pb-10">
      <Link
        href={`${APP_BP}/${teamSlug}/workspace/publish/post/new/${data.id}`}
        className="flex flex-col overflow-hidden rounded-lg"
      >
        <div className="relative h-44 overflow-hidden">
          <BlurImage
            alt={data.title ?? 'Card thumbnail'}
            width={500}
            height={400}
            className="h-44 object-cover grayscale group-hover:grayscale-0"
            src={data.image ?? '/post-placeholder.jpg'}
            placeholder="blur"
            blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
          />
        </div>
        <div className="space-y-2 border-t p-4">
          <div className="flex flex-wrap items-center gap-y-1 overflow-hidden">
            <div className="flex items-center gap-x-2">
              <div className="flex gap-x-1">
                <Image
                  width={48}
                  height={48}
                  src={data.site?.logo ?? '/default-site-logo.jpg'}
                  alt=""
                  className="h-5 w-5 flex-none rounded-full bg-background/10"
                  placeholder="blur"
                  blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
                />
              </div>
              <h3 className="text-sm font-semibold leading-6 text-primary">
                <span className="absolute inset-0" />
                {data.site?.name} New
              </h3>
            </div>
          </div>
          <h3 className="my-0 line-clamp-2 text-lg font-semibold leading-6 text-foreground">
            {data.title || 'Draft post without a title'}
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
            className="truncate rounded-md py-2 text-xs text-muted-foreground underline underline-offset-4 transition-colors group-hover:text-foreground"
          >
            <span className="flex flex-row items-center gap-1 text-primary">
              Visit post
              {''}
              <Icons.arrowSquareOut className="ml-1 h-3 w-3 text-muted-foreground transition-colors group-hover:text-foreground" />
            </span>
          </a>
        </div>
      ) : (
        <span className="absolute bottom-4 mx-4 rounded-sm border border-primary px-2 text-sm font-medium text-primary shadow-md">
          Draft
        </span>
      )}
    </div>
  );
}
