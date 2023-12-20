import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { siteConfig } from '#/config/site';

import { authOptions } from '#/lib/auth';
import { APP_BP, SITE_URL } from '#/lib/const';
import { db } from '#/lib/db';
import { getCourses } from '#/lib/operations/learn/get-courses';
import { getTeamSubscriptionPlan } from '#/lib/operations/subsctiptions/subscription';
import { getTeam } from '#/lib/operations/teams/get-current-team';

import { DashboardShell } from '#/components/dashboard/shell';
import { Categories } from '#/components/learn/dashboard/categories';
import { CoursesList } from '#/components/learn/dashboard/courses-list';
import { SearchInput } from '#/components/learn/dashboard/search-input';

interface PlaybooksSearchPageProps {
  searchParams: {
    page: string;
    title: string;
    categoryId: string;
  };
  params: {
    team_slug: string;
  };
}

const PlaybooksSearchPage = async ({
  searchParams,
  params: { team_slug },
}: PlaybooksSearchPageProps) => {
  const team = await getTeam(team_slug);

  if (!team) {
    redirect(authOptions?.pages?.signIn || '/login');
  }

  if (!team.isPersonal) {
    redirect(`${APP_BP}/${team.slug}/oops`);
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

  const userSubscriptionPlan = await getTeamSubscriptionPlan(team.id);
  const isPaidMember = userSubscriptionPlan.isPaid;

  const page = parseInt(searchParams.page as string) || 1;
  const take = 6;
  const skip = (page - 1) * take;

  const { courses, count } = await getCourses({
    teamId: team.id,
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
          teamSlug={team.slug}
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

  const pageUrl = `${SITE_URL}${APP_BP}/workspace/learn/search`;

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
