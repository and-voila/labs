import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { DashboardShell } from '@/app/components/dashboard/shell';
import { CoursesList } from '@/app/components/learn/courses/courses-list';
import { Categories } from '@/app/components/learn/dashboard/categories';
import { SearchInput } from '@/app/components/search-input';
import { getCourses } from '@/app/lib/actions/get-courses';
import { authOptions } from '@/app/lib/auth';
import { db } from '@/app/lib/db';
import { getSession } from '@/app/lib/session';
import { getUserSubscriptionPlan } from '@/app/lib/subscription';

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
  const session = await getSession();
  if (!session) {
    redirect(authOptions?.pages?.signIn || '/login');
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

  const userSubscriptionPlan = await getUserSubscriptionPlan(session.user.id);
  const isPaidMember = userSubscriptionPlan.isPaid;

  const page = parseInt(searchParams.page as string) || 1;
  const take = 9;
  const skip = (page - 1) * take;

  const { courses, count } = await getCourses({
    userId: session.user.id,
    ...searchParams,
    isPaidMember,
    skip,
    take,
  });

  const totalPages = Math.ceil(count / take);
  const hasNextPage = page * take < count;

  return (
    <DashboardShell>
      <div className="mx-auto grid space-y-8 p-6 lg:p-8">
        <SearchInput />
        <Categories items={categories} />
        <CoursesList
          items={courses}
          currentPage={page}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
        />
      </div>
    </DashboardShell>
  );
};

export default PlaybooksSearchPage;

export function generateMetadata(): Metadata {
  const title = 'Browse Playbooks';
  const description =
    'Dive into a growing collection of proven marketing Playbooks on And Voila. Tailored for digital marketing pros who need the gist in 3 minutes or less.';

  const baseUrl =
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001';

  const ogImageUrl = new URL(`${baseUrl}/api/og`);
  ogImageUrl.searchParams.set('title', title);

  const pageUrl = `${baseUrl}/learn/search`;

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
