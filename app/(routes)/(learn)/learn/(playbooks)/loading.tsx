import { DashboardShell } from '@/app/components/dashboard/shell';
import {
  CourseCardSkeleton,
  InfoCardSkeleton,
} from '@/app/components/skeletons';

export default function MyPlaybooksLoading() {
  return (
    <DashboardShell>
      <div className="space-y-8 p-6">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2">
          <InfoCardSkeleton />
          <InfoCardSkeleton />
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <CourseCardSkeleton />
          <CourseCardSkeleton />
          <CourseCardSkeleton />
          <CourseCardSkeleton />
          <CourseCardSkeleton />
          <CourseCardSkeleton />
        </div>
      </div>
    </DashboardShell>
  );
}
