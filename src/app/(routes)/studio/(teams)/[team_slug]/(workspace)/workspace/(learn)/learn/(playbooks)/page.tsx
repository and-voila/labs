import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getTeam } from ':/src/lib/team/get-current-team';

import { siteConfig } from '#/config/site';

import { getDashboardCourses } from '#/lib/actions/get-dashboard-courses';
import { authOptions } from '#/lib/auth';
import { APP_BP, SITE_URL } from '#/lib/const';

import { DashboardShell } from '#/components/dashboard/shell';
import { CoursesList } from '#/components/learn/courses/courses-list';
import { InfoCard } from '#/components/learn/dashboard/info-card';

interface MyPlaybooksPageProps {
  searchParams: {
    page?: string;
  };
  params: {
    team_slug: string;
  };
}

export default async function MyPlaybooksPage({
  searchParams,
  params: { team_slug },
}: MyPlaybooksPageProps) {
  const team = await getTeam(team_slug);

  if (!team) {
    redirect(authOptions?.pages?.signIn || '/login');
  }

  if (!team.isPersonal) {
    redirect(`${APP_BP}/${team.slug}/oops`);
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
    teamId: team.id,
    skip,
    take,
  });

  const totalPages = Math.ceil(count / take);
  const hasNextPage = page * take < count;

  return (
    <DashboardShell>
      <div className="space-y-8 px-6">
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
          teamSlug={team.slug}
        />
      </div>
    </DashboardShell>
  );
}

export function generateMetadata(): Metadata {
  const title = 'My Playbooks';
  const description = `Access your Playbooks library on ${siteConfig.name}. Explore, track, and revisit your marketing guide collection, tailored for dynamic digital marketing success.`;

  const ogImageUrl = new URL(`${SITE_URL}/api/og`);
  ogImageUrl.searchParams.set('title', title);

  const pageUrl = `${SITE_URL}${APP_BP}/workspace/learn`;

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
