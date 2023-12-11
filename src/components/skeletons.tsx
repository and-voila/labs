import { Skeleton } from '#/components/ui/skeleton';

// Navbar Skeletons

export const SearchInputSkeleton = () => {
  return (
    <div className="relative flex items-center">
      <Skeleton className="absolute left-2 h-4 w-4 rounded-full" />
      <Skeleton className="h-6 w-full rounded-lg pl-9 md:w-[300px]" />
    </div>
  );
};

// Playbook Skeletons

export const CourseCardSkeleton = () => {
  return (
    <div className="h-full overflow-hidden rounded-xl border bg-card">
      <Skeleton className="h-48 w-full rounded-t-xl" />
      <div className="mt-1 flex flex-col p-4">
        <div className="mb-2 flex items-center justify-between">
          <Skeleton className="h-4 w-20 rounded-md" />
          <Skeleton className="h-4 w-24 rounded-md" />
        </div>
        <Skeleton className="mb-2 h-6 w-3/4 rounded-md" />
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-3/4 rounded-md" />
      </div>
    </div>
  );
};

export const CategoryItemSkeleton = () => {
  return (
    <div className="flex items-center gap-x-1 rounded-lg border px-3 py-2">
      <Skeleton className="h-4 w-20 rounded-md" />
    </div>
  );
};

export const InfoCardSkeleton = () => {
  return (
    <div className="flex items-center gap-x-2 rounded-md border bg-card p-3 shadow">
      <Skeleton className="h-6 w-6" />
      <div>
        <Skeleton className="mb-2 h-4 w-24" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  );
};

// Dashboard Skeletons

export const DashboardSkeleton = () => {
  return (
    <div className="py-24 md:mt-8 lg:py-32">
      <div className="mx-auto grid max-w-6xl gap-4 px-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:max-w-7xl">
        {Array(3)
          .fill(0)
          .map((_, idx) => (
            <div
              key={idx}
              className="mt-4 flex cursor-pointer flex-col p-6 transition hover:shadow-md dark:hover:shadow-muted"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-6 w-3/4 font-medium" />
              </div>
              <Skeleton className="mt-4 h-6 w-full flex-grow" />
              <Skeleton className="mt-4 h-10 w-full" />
            </div>
          ))}
      </div>
    </div>
  );
};

// Tools Skeletons

export const ToolsDashboardCardSkeleton = () => {
  return (
    <>
      <div className="flex flex-row gap-2">
        <Skeleton className="h-12 w-12 rounded-sm" />
        <div className="mt-2 flex flex-col gap-1">
          <Skeleton className="h-5 w-36 rounded-md" />
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-2">
        <Skeleton className="h-3 w-96 rounded-md" />
        <Skeleton className="h-3 w-96 rounded-md" />
        <Skeleton className="h-3 w-96 rounded-md" />
        <div className="h-3 w-52 rounded-md" />
      </div>
      <div className="flex h-16 flex-row">
        <Skeleton className="mt-8 h-8 w-full rounded-md" />
      </div>
    </>
  );
};

export const BannerSkeleton = () => {
  return <Skeleton className="mt-0.5 h-12 w-full p-4" />;
};
