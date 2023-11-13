import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { DashboardShell } from '@/app/components/dashboard/shell';
import { CoursesList } from '@/app/components/learn/courses/courses-list';
import { Categories } from '@/app/components/learn/dashboard/categories';
import { SearchInput } from '@/app/components/search-input';
import { checkSubscription } from '@/app/lib/actions/check-subscription';
import { getCourses } from '@/app/lib/actions/get-courses';
import { authOptions } from '@/app/lib/auth';
import { db } from '@/app/lib/db';
import { getCurrentUser } from '@/app/lib/session';

interface PlaybooksSearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

const PlaybooksSearchPage = async ({
  searchParams,
}: PlaybooksSearchPageProps) => {
  const user = await getCurrentUser();
  const userId = user?.id;

  if (!userId) {
    redirect(authOptions?.pages?.signIn || '/login');
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  const isPaidMember = await checkSubscription();

  const courses = await getCourses({
    userId,
    ...searchParams,
    isPaidMember,
  });

  return (
    <DashboardShell>
      <div className="mx-auto grid space-y-8 p-6 lg:p-8">
        <SearchInput />
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </DashboardShell>
  );
};

export default PlaybooksSearchPage;

export function generateMetadata(): Metadata {
  const title = 'Browse Playbooks';
  const description =
    'Dive into a growing collection of proven marketing Playbooks on And Voila. Tailored for digital marketing pros who need the gist in 3 minutes or less.';

  const url = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/learn/search`
    : 'http://localhost:3001/learn/search';

  const metadata = {
    title,
    description,
    openGraph: {
      type: 'website',
      title,
      description,
      images: [
        {
          url: '/open-graph.gif',
          width: 1200,
          height: 630,
          alt: 'An open graph image that appears to look like a Loading screen with the And Voila logo.',
        },
      ],
      url,
    },
    twitter: {
      title,
      description,
      images: [
        {
          url: '/open-graph.gif',
          width: 1200,
          height: 630,
          alt: 'An open graph image that appears to look like a Loading screen with the And Voila logo.',
        },
      ],
    },
  };

  return metadata;
}
