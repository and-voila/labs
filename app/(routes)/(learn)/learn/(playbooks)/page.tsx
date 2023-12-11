import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { getDashboardCourses } from '#/lib/actions/get-dashboard-courses';
import { authOptions } from '#/lib/auth';
import { getSession } from '#/lib/session';
import { DashboardShell } from '#/components/dashboard/shell';
import { CoursesList } from '#/components/learn/courses/courses-list';
import { InfoCard } from '#/components/learn/dashboard/info-card';

interface MyPlaybooksPageProps {
  searchParams: {
    page?: string;
  };
}

export default async function MyPlaybooksPage({
  searchParams,
}: MyPlaybooksPageProps) {
  const session = await getSession();
  if (!session) {
    redirect(authOptions?.pages?.signIn || '/login');
  }

  const page = parseInt(searchParams.page as string) || 1;
  const take = 6;
  const skip = (page - 1) * take;

  const {
    completedCourses,
    coursesInProgress,
    count,
    totalCompletedCourses,
    totalCoursesInProgress,
  } = await getDashboardCourses({
    userId: session.user.id,
    skip,
    take,
  });

  const totalPages = Math.ceil(count / take);
  const hasNextPage = page * take < count;

  return (
    <DashboardShell>
      <div className="space-y-8 p-6">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2">
          <InfoCard
            icon="clock"
            label="In progress"
            numberOfItems={totalCoursesInProgress}
          />
          <InfoCard
            icon="circleChecked"
            label="Completed"
            numberOfItems={totalCompletedCourses}
            variant="success"
          />
        </div>
        <CoursesList
          items={[...completedCourses, ...coursesInProgress]}
          currentPage={page}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
        />
      </div>
    </DashboardShell>
  );
}

export function generateMetadata(): Metadata {
  const title = 'My Playbooks';
  const description =
    'Access your Playbooks library on And Voila. Explore, track, and revisit your marketing guide collection, tailored for dynamic digital marketing success.';

  const baseUrl =
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001';

  const ogImageUrl = new URL(`${baseUrl}/api/og`);
  ogImageUrl.searchParams.set('title', title);

  const pageUrl = `${baseUrl}/learn`;

  const metadata = {
    title,
    description,
    openGraph: {
      type: 'website',
      title,
      description,
      images: [
        {
          url: ogImageUrl.toString(),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      url: pageUrl,
    },
    twitter: {
      title,
      description,
      images: [
        {
          url: ogImageUrl.toString(),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };

  return metadata;
}
