import type { Post } from '@prisma/client';

import Link from 'next/link';

import { placeholderBlurhash, toDateString } from '#/lib/utils';

import BlurImage from '#/components/publish/blur-image';

interface BlogCardProps {
  data: Pick<
    Post,
    'slug' | 'image' | 'imageBlurhash' | 'title' | 'description' | 'createdAt'
  >;
}

export default function BlogCard({ data }: BlogCardProps) {
  return (
    <Link href={`/${data.slug}`}>
      <div className="ease overflow-hidden rounded-2xl border bg-card pb-6 shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
        <BlurImage
          src={data.image!}
          alt={data.title ?? 'Blog Post'}
          width={500}
          height={400}
          className="h-64 w-full object-cover"
          placeholder="blur"
          blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
        />
        <div className="h-36 px-5 py-8">
          <h3 className="line-clamp-1 text-xl font-semibold">{data.title}</h3>
          <p className="text-md my-2 line-clamp-2 h-12 text-muted-foreground">
            {data.description}
          </p>
          <p className="my-2 text-sm text-primary">
            {toDateString(data.createdAt)}
          </p>
        </div>
      </div>
    </Link>
  );
}
