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

export const metadata = {
  title: 'Browse Playbooks',
  description:
    'Dive into your collection of exclusive Playbooks on And Voila. Tailored for digital marketing success, each guide is a step towards mastering your craft.',
};

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
