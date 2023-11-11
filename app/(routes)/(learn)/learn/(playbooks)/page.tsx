import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { DashboardShell } from '@/app/components/dashboard/shell';
import { CoursesList } from '@/app/components/learn/courses/courses-list';
import { InfoCard } from '@/app/components/learn/dashboard/info-card';
import { getDashboardCourses } from '@/app/lib/actions/get-dashboard-courses';
import { authOptions } from '@/app/lib/auth';
import { getCurrentUser } from '@/app/lib/session';

export const metadata: Metadata = {
  title: 'My Playbooks',
  description:
    'Access your Playbooks library on And Voila. Explore, track, and revisit your marketing guide collection, tailored for dynamic digital marketing success.',
};

export default async function MyPlaybooksPage() {
  const user = await getCurrentUser();
  const userId = user?.id;

  if (!userId) {
    redirect(authOptions?.pages?.signIn || '/login');
  }

  const { completedCourses, coursesInProgress } =
    await getDashboardCourses(userId);

  return (
    <DashboardShell>
      <div className="space-y-8 p-6">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2">
          <InfoCard
            icon="clock"
            label="In Progress"
            numberOfItems={coursesInProgress.length}
          />
          <InfoCard
            icon="circleChecked"
            label="Completed"
            numberOfItems={completedCourses.length}
            variant="default"
          />
        </div>
        <CoursesList items={[...coursesInProgress, ...completedCourses]} />
      </div>
    </DashboardShell>
  );
}
