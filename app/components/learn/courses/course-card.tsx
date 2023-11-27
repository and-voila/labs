import { Suspense } from 'react';
import Link from 'next/link';

import { Skeleton } from '@/app/components/ui/skeleton';
import BlurImage from '@/app/components/write/blur-image';
import { getCoursePrice } from '@/app/lib/course-pricing';
import { placeholderBlurhash } from '@/app/lib/utils';

interface CourseCardProps {
  id: string;
  title: string;
  preview: string;
  imageUrl: string;
  displayImage?: boolean;
  price: number;
  progress: number | null;
  category: string;
  isPaidMember: boolean;
  purchased: boolean;
}
export const CourseCard = ({
  id,
  title,
  preview,
  imageUrl,
  displayImage = true,
  price,
  progress,
  category,
  isPaidMember,
  purchased,
}: CourseCardProps) => {
  const displayPrice = getCoursePrice(price, isPaidMember, purchased);

  return (
    <Link href={`/learn/courses/${id}`}>
      <div className="group h-full overflow-hidden rounded-xl border bg-card transition hover:shadow-sm">
        {displayImage && (
          <div className="relative aspect-video w-full overflow-hidden md:grayscale md:group-hover:grayscale-0">
            <BlurImage
              fill
              className="object-cover"
              alt={title}
              src={imageUrl}
              placeholder="blur"
              blurDataURL={placeholderBlurhash}
              role="img"
            />
          </div>
        )}
        <div className="mt-1 flex flex-col p-4">
          <div className="mb-2 flex items-center justify-between">
            <Suspense fallback={<Skeleton className="h-4 w-12" />}>
              <p className="text-sm text-muted-foreground">{category}</p>
            </Suspense>
            <Suspense fallback={<Skeleton className="h-4 w-12" />}>
              {progress !== null ? (
                progress === 0 ? (
                  <p className="text-sm text-primary">Not Started</p>
                ) : progress === 100 ? (
                  <p className="text-sm text-alternate">Complete</p>
                ) : (
                  <p className="text-sm text-primary">In Progress</p>
                )
              ) : (
                <p className="text-sm text-primary">{displayPrice}</p>
              )}
            </Suspense>
          </div>
          <Suspense fallback={<Skeleton className="h-8 w-3/4" />}>
            <div className="line-clamp-2 text-lg font-bold leading-tight transition group-hover:text-primary">
              {title}
            </div>
          </Suspense>
          <Suspense fallback={<Skeleton className="h-24 w-3/5" />}>
            <p className="my-2 line-clamp-2 text-sm text-muted-foreground">
              {preview}
            </p>
          </Suspense>
        </div>
      </div>
    </Link>
  );
};
