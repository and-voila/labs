/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from 'next/link';
import { Post, Site } from '@prisma/client';
import { BarChart, ExternalLink } from 'lucide-react';

import BlurImage from '@/app/components/write/blur-image';
import { placeholderBlurhash, random } from '@/app/lib/utils';

export default function PostCard({
  data,
}: {
  data: Post & { site: Site | null };
}) {
  const url = `${data.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/${data.slug}`;

  return (
    <div className="relative rounded-lg border bg-card pb-10 shadow-md transition-all hover:shadow-xl">
      <Link
        href={`/tools/write/post/${data.id}`}
        className="flex flex-col overflow-hidden rounded-lg"
      >
        <div className="relative h-44 overflow-hidden">
          <BlurImage
            alt={data.title ?? 'Card thumbnail'}
            width={500}
            height={400}
            className="h-44 object-cover grayscale hover:grayscale-0"
            src={data.image ?? '/placeholder.png'}
            placeholder="blur"
            blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
          />
          {!data.published && (
            <span className="absolute bottom-2 right-2 rounded-sm border border-muted-foreground bg-muted-foreground/20 px-1  text-sm font-medium text-muted-foreground shadow-md">
              Draft
            </span>
          )}
        </div>
        <div className="border-t p-4">
          <h3 className="my-0 truncate text-lg font-semibold">{data.title}</h3>
          <p className="mt-2 line-clamp-1 text-sm leading-snug text-muted-foreground">
            {data.description}
          </p>
        </div>
      </Link>
      <div className="absolute bottom-4 flex w-full px-4">
        <a
          href={
            process.env.NEXT_PUBLIC_VERCEL_ENV
              ? `https://${url}`
              : `http://${data.site?.subdomain}.localhost:3001/${data.slug}`
          }
          target="_blank"
          rel="noreferrer"
          className="truncate rounded-md bg-brand/20 px-2 py-1 text-xs text-brand transition-colors hover:opacity-70"
        >
          {url} ↗
        </a>
      </div>
    </div>
  );
}
