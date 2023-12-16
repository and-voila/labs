import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { siteConfig } from '#/config/site';

import { getCourses } from '#/lib/actions/get-courses';
import { authOptions } from '#/lib/auth';
import { APP_BP, SITE_URL } from '#/lib/const';
import { db } from '#/lib/db';
import { getUserSubscriptionPlan } from '#/lib/subscription';
import { getTeams } from '#/lib/team/get-teams';

import { DashboardShell } from '#/components/dashboard/shell';
import { CoursesList } from '#/components/learn/courses/courses-list';
import { Categories } from '#/components/learn/dashboard/categories';
import { SearchInput } from '#/components/search-input';

interface PlaybooksSearchPageProps {
  searchParams: {
    page: string;
    title: string;
    categoryId: string;
  };
}

const PlaybooksSearchPage = async ({
  searchParams,
}: PlaybooksSearchPageProps) => {
  const { user, teams } = await getTeams();
  if (!user) {
    redirect(authOptions?.pages?.signIn || '/login');
  }

  const personalTeam = teams.find((team) => team.isPersonal);
  if (!personalTeam) {
    throw new Error('No personal team found');
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc',
    },
    cacheStrategy: {
      ttl: 86400,
      swr: 300,
    },
  });

  const userSubscriptionPlan = await getUserSubscriptionPlan(personalTeam.id);
  const isPaidMember = userSubscriptionPlan.isPaid;

  const page = parseInt(searchParams.page as string) || 1;
  const take = 6;
  const skip = (page - 1) * take;

  const { courses, count } = await getCourses({
    teamId: personalTeam.id,
    ...searchParams,
    isPaidMember,
    skip,
    take,
  });

  const totalPages = Math.ceil(count / take);
  const hasNextPage = page * take < count;

  return (
    <DashboardShell>
      <div className="grid space-y-8">
        <SearchInput />
        <Categories items={categories} />
        <CoursesList
          items={courses}
          currentPage={page}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
          teamSlug={personalTeam.slug}
        />
      </div>
    </DashboardShell>
  );
};

export default PlaybooksSearchPage;

export function generateMetadata(): Metadata {
  const title = 'Browse Playbooks';
  const description = `Dive into a growing collection of proven marketing Playbooks on ${siteConfig.name}. Tailored for digital marketing pros who need the gist in 3 minutes or less.`;

  const ogImageUrl = new URL(`${SITE_URL}/api/og`);
  ogImageUrl.searchParams.set('title', title);

  const pageUrl = `${SITE_URL}${APP_BP}/learn/search`;

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
