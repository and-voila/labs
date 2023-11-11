import { redirect } from 'next/navigation';

import { CourseSidebar } from '@/app/components/learn/courses/course-sidebar';
import { checkSubscription } from '@/app/lib/actions/check-subscription';
import { getProgress } from '@/app/lib/actions/get-progress';
import { getApiLimitCount } from '@/app/lib/api-limit';
import { db } from '@/app/lib/db';
import { getCurrentUser } from '@/app/lib/session';

const PlaybookLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const apiLimitCount = await getApiLimitCount();
  const isPaidMember = await checkSubscription();
  const user = await getCurrentUser();
  const userId = user?.id;

  if (!userId) {
    return redirect('/');
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId,
            },
          },
        },
        orderBy: {
          position: 'asc',
        },
      },
    },
  });

  if (!course) {
    return redirect('/');
  }

  const progressCount = await getProgress(userId, course.id);

  return (
    <div className="flex-1 md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
      <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto py-6 md:sticky md:block lg:py-10">
        <CourseSidebar
          course={course}
          progressCount={progressCount}
          isPaidMember={isPaidMember}
          apiLimitCount={apiLimitCount}
        />
      </aside>
      {children}
    </div>
  );
};

export default PlaybookLayout;
