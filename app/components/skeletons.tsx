import { Icons } from '@/app/components/shared/icons';
import { Skeleton } from '@/app/components/ui/skeleton';
import { cn } from '@/app/lib/utils';

// Sidebar Skeletons

export const SidebarItemSkeleton = () => {
  return (
    <div className={cn('flex items-center gap-x-2 py-4 pl-6')}>
      <Skeleton className="h-5 w-5 rounded-full" />
      <Skeleton className="h-4 w-24" />
    </div>
  );
};

export const SidebarRoutesSkeleton = () => {
  return (
    <div className="mt-6 flex w-full flex-col">
      <SidebarItemSkeleton />
      <SidebarItemSkeleton />
      <SidebarItemSkeleton />
      <SidebarItemSkeleton />
      <SidebarItemSkeleton />
    </div>
  );
};

export const LogoSkeleton = () => {
  return (
    <div className={cn('flex items-center')}>
      <Skeleton className="h-8 w-8 rounded-full" />
      <Skeleton className="ml-2 h-8 w-32" />
    </div>
  );
};

export const FreeCounterSkeleton = () => {
  return (
    <div className="px-2">
      <div className={cn('rounded-md border bg-primary-foreground p-4')}>
        <Skeleton className="mx-auto my-2 h-5 w-2/3" />
        <Skeleton className="mx-auto my-2 h-4 w-4/5" />
        <Skeleton className="mx-auto my-2 h-4 w-4/5" />
        {/* Placeholder for API_LIMIT_COUNT progress bar */}
        {/* <Skeleton className="w-full h-3 my-2" />  Progress bar */}
        <Skeleton className="my-2 h-8 w-full" />
      </div>
    </div>
  );
};

// Navbar Skeletons

export const SearchInputSkeleton = () => {
  return (
    <div className="relative flex items-center pl-4">
      <Skeleton className="absolute left-6 h-4 w-4 rounded-full" />{' '}
      <Skeleton className="h-6 w-full rounded-lg" />
    </div>
  );
};

export const ExitButtonSkeleton = () => {
  return (
    <div className="ml-auto flex pr-6">
      <Skeleton className="h-6 w-24 rounded-md" />
    </div>
  );
};

export const ModeToggleSkeleton = () => {
  return (
    <div className="relative">
      <Skeleton className="h-6 w-6 rounded-md" />
    </div>
  );
};

export const CommunityIconSkeleton = () => {
  return <Skeleton className="h-9 w-9 rounded-full" />;
};

export const UserAvatarSkeleton = () => {
  return <Skeleton className="h-8 w-8 rounded-full bg-brand" />;
};

export const UserAccountNavSkeleton = () => {
  return (
    <div className="relative inline-block">
      <Skeleton className="h-8 w-8 rounded-full" />
      <div className="absolute right-0 top-full mt-2 w-48 rounded-md shadow-lg">
        <div className="rounded-md bg-white p-2 dark:bg-gray-800">
          <Skeleton className="my-1 block h-4 w-24" />
          <Skeleton className="my-1 block h-3 w-32" />
          <div className="my-2 border-t border-gray-200 dark:border-gray-700" />
          <Skeleton className="my-1 block h-4 w-24" />
          <Skeleton className="my-1 block h-4 w-24" />
          <Skeleton className="my-1 block h-4 w-24" />
          <div className="my-2 border-t border-gray-200 dark:border-gray-700" />
          <Skeleton className="my-1 block h-4 w-24" />
        </div>
      </div>
    </div>
  );
};

// Playbook Skeletons

interface CourseCardSkeletonProps {
  displayImage?: boolean;
}

export const CourseCardSkeleton = ({
  displayImage = true,
}: CourseCardSkeletonProps) => {
  return (
    <div className="h-full overflow-hidden rounded-xl border bg-white dark:bg-background">
      {displayImage && <Skeleton className="h-32 w-full rounded-t-xl" />}
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

export const ProgressSkeleton = () => {
  return (
    <div className="relative h-4 w-full overflow-hidden rounded-full bg-secondary">
      <Skeleton className="h-full w-3/4 bg-primary" />
    </div>
  );
};

export const CourseProgressSkeleton = () => {
  return (
    <div className="mt-2">
      <ProgressSkeleton />
      <Skeleton className="mt-2 h-4 w-24 rounded-md" />
    </div>
  );
};

export const CourseSidebarItemSkeleton = () => {
  return (
    <div className="flex items-center gap-x-2 pl-6 text-left text-sm font-semibold text-muted-foreground">
      <Skeleton className="h-4 w-4 rounded-full" />
      <Skeleton className="h-4 w-32 rounded-md" />
    </div>
  );
};

export const CourseImageSkeleton = () => {
  return (
    <Skeleton
      className="w-full py-4 shadow-md"
      style={{ height: '1200px' }}
      role="img"
      aria-label="Loading playbook image..."
    />
  );
};

export const CourseTitleSkeleton = () => {
  return (
    <div className="mb-2 flex-grow">
      <Skeleton className="h-10 w-3/4" />
    </div>
  );
};

export const CourseButtonsSkeleton = () => {
  return (
    <div className="flex w-full flex-col items-center gap-x-4 space-y-6 py-4 sm:py-0 lg:w-auto lg:flex-row lg:space-y-0 lg:p-6">
      <Skeleton className="h-10 w-32" />
      <Skeleton className="h-10 w-24" />
    </div>
  );
};

export const CoursePreviewSkeleton = () => {
  return (
    <div className="prose">
      <Skeleton className="mb-4 h-4 w-3/4" />
      <Skeleton className="mb-4 h-4 w-1/2" />
      <Skeleton className="mb-4 h-4 w-5/6" />
      <ul>
        <li>
          <Skeleton className="mb-2 h-4 w-1/3" />
        </li>
        <li>
          <Skeleton className="mb-2 h-4 w-1/2" />
        </li>
        <li>
          <Skeleton className="mb-4 h-4 w-2/5" />
        </li>
      </ul>
      <Skeleton className="mb-4 h-4 w-4/6" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
};

export const VideoPlayerSkeleton = () => {
  return (
    <div className="relative aspect-video bg-gray-300">
      <div className="absolute inset-0 flex items-center justify-center bg-opacity-50">
        <Icons.play className="h-16 w-16 text-gray-500" />
      </div>
      <div className="absolute bottom-0 left-0 h-1 w-full">
        <Skeleton className="h-full w-1/4 bg-brand" />
      </div>
    </div>
  );
};

// Teacher Courses Skeletons

export const TeacherCoursesFilterSkeleton = () => {
  return (
    <div className="max-w-sm">
      <Skeleton className="h-10 rounded-md" />
    </div>
  );
};

export const TeacherCoursesTableSkeleton = () => {
  return (
    <div className="my-6 rounded-md border bg-white dark:bg-background">
      <div className="rounded-xl">
        <div className="flex">
          <Skeleton className="m-2 h-10 w-1/2 rounded-md" />
          <Skeleton className="m-2 h-10 w-1/6 rounded-md" />
          <Skeleton className="m-2 h-10 w-1/6 rounded-md" />
          <Skeleton className="m-2 h-10 w-1/6 rounded-md" />
        </div>

        {Array.from({ length: 10 }).map((_, index) => (
          <div className="flex" key={index}>
            <Skeleton className="m-2 h-10 w-1/2 rounded-md" />
            <Skeleton className="m-2 h-10 w-1/6 rounded-md" />
            <Skeleton className="m-2 h-10 w-1/6 rounded-md" />
            <Skeleton className="m-2 h-10 w-1/6 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
};

export const TeacherCoursesPaginationSkeleton = () => {
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <Skeleton className="h-8 w-24 rounded-md" />
      <Skeleton className="h-8 w-24 rounded-md" />
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

export const DashboardCardSkeleton = () => {
  return (
    <div className="py-24 md:mt-8 lg:py-32">
      <div className="mx-auto grid max-w-6xl gap-4 px-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:max-w-7xl">
        <div className="mt-4 flex cursor-pointer flex-col p-6 transition hover:shadow-md dark:hover:shadow-muted">
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-6 w-3/4 font-medium" />
          </div>
          <Skeleton className="mt-4 h-6 w-full flex-grow" />
          <Skeleton className="mt-4 h-10 w-full" />
        </div>
      </div>
    </div>
  );
};

// Miscellaneous Skeletons

export const SessionInfoSkeleton = () => {
  return (
    <div className="absolute bottom-6 right-6 rounded-lg bg-alternate/50 p-4 backdrop-blur-md">
      <p className="font-mono text-xs font-bold">For testing purposes</p>
      <Skeleton className="mt-2 h-4 w-20" />
    </div>
  );
};
