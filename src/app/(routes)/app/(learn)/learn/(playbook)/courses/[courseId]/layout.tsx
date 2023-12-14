import { redirect } from 'next/navigation';

import { getProgress } from '#/lib/actions/get-progress';
import { getApiLimitCount } from '#/lib/api-limit';
import { authOptions } from '#/lib/auth';
import { CP_PREFIX } from '#/lib/const';
import { db } from '#/lib/db';
import { getUserSubscriptionPlan } from '#/lib/subscription';
import { getTeams } from '#/lib/team/get-teams';

import { CourseSidebar } from '#/components/learn/courses/course-sidebar';

const PlaybookLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const apiLimitCount = await getApiLimitCount();
  const { user, teams } = await getTeams();
  if (!user) {
    redirect(authOptions?.pages?.signIn || '/login');
  }

  const personalTeam = teams.find((team) => team.isPersonal);

  if (!personalTeam) {
    throw new Error('No personal team found');
  }

  const userSubscriptionPlan = await getUserSubscriptionPlan(personalTeam.id);
  const isPaidMember = userSubscriptionPlan.isPaid;

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
              teamId: personalTeam.id,
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
    return redirect(`${CP_PREFIX}/admin/teacher/courses`);
  }

  const progressCount = await getProgress(personalTeam.id, course.id);

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
