import { DashboardShell } from '@/app/components/dashboard/shell';
import {
  CategoryItemSkeleton,
  CourseCardSkeleton,
  SearchInputSkeleton,
} from '@/app/components/skeletons';

export default function PlaybooksSearchLoading() {
  return (
    <DashboardShell>
      <div className="space-y-8 p-6 lg:p-8">
        <div className="relative flex items-center">
          <SearchInputSkeleton />
        </div>
        <div className="flex items-center gap-x-2 overflow-x-auto">
          <CategoryItemSkeleton />
          <CategoryItemSkeleton />
          <CategoryItemSkeleton />
          <CategoryItemSkeleton />
          <CategoryItemSkeleton />
          <CategoryItemSkeleton />
          <CategoryItemSkeleton />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:min-w-max lg:grid-cols-3">
        <CourseCardSkeleton />
        <CourseCardSkeleton />
        <CourseCardSkeleton />
        <CourseCardSkeleton />
        <CourseCardSkeleton />
        <CourseCardSkeleton />
        <CourseCardSkeleton />
        <CourseCardSkeleton />
        <CourseCardSkeleton />
      </div>
    </DashboardShell>
  );
}
