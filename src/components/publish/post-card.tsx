import Link from 'next/link';
import { Post, Site } from '@prisma/client';

import { APP_BP } from '#/lib/const';
import { placeholderBlurhash } from '#/lib/utils';

import BlurImage from '#/components/publish/blur-image';
import { Icons } from '#/components/shared/icons';

interface PostCardProps {
  data: Post & { site: Site | null };
  teamSlug: string;
}

export default function PostCard({ data, teamSlug }: PostCardProps) {
  const url = `${data.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/${data.slug}`;

  return (
    <div className="group relative rounded-lg border border-border bg-card pb-10">
      <Link
        href={`${APP_BP}/${teamSlug}/workspace/publish/post/${data.id}`}
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
          {!data.published && (
            <span className="absolute bottom-2 right-2 rounded-sm border border-muted-foreground bg-foreground px-1  text-sm font-medium text-primary-foreground shadow-md">
              Draft
            </span>
          )}
        </div>
        <div className="border-t p-4">
          <h3 className="my-0 line-clamp-2 text-lg font-semibold group-hover:text-primary">
            {data.title || 'Draft post without a title'}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-snug text-muted-foreground">
            {data.description ||
              "Before I publish this, I'll be sure to replace this description with something awesome, because SEO, right? "}
          </p>
        </div>
      </Link>
      {data.published && (
        <div className="absolute bottom-4 flex w-full px-4">
          <a
            href={
              process.env.NEXT_PUBLIC_VERCEL_ENV
                ? `https://${url}`
                : `http://${data.site?.subdomain}.localhost:3001/${data.slug}`
            }
            target="_blank"
            rel="noreferrer"
            className="truncate rounded-md py-2 text-xs text-muted-foreground underline underline-offset-4 transition-colors group-hover:opacity-70"
          >
            <span className="flex flex-row items-center gap-1">
              Visit post
              {''}
              <Icons.arrowSquareOut className="ml-1 h-3 w-3 text-primary" />
            </span>
          </a>
        </div>
      )}
    </div>
  );
}
