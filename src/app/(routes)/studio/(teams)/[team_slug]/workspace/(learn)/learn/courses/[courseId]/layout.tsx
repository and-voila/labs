import { redirect } from 'next/navigation';

import { authOptions } from '#/lib/auth';
import { APP_BP } from '#/lib/const';
import { db } from '#/lib/db';
import { getProgress } from '#/lib/operations/learn/get-progress';
import { getTeamSubscriptionPlan } from '#/lib/operations/subsctiptions/subscription';
import { getTeam } from '#/lib/operations/teams/get-current-team';

import { CourseSidebar } from '#/components/learn/dashboard/course-sidebar';

interface PlaybookLayoutProps {
  children: React.ReactNode;
  params: { courseId: string; team_slug: string };
}

const PlaybookLayout = async ({ children, params }: PlaybookLayoutProps) => {
  const team = await getTeam(params.team_slug);

  if (!team) {
    redirect(authOptions?.pages?.signIn || '/login');
  }

  if (!team.isPersonal) {
    redirect(`${APP_BP}/${team.slug}/oops`);
  }

  const userSubscriptionPlan = await getTeamSubscriptionPlan(team.id);
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
              teamId: team.id,
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
    return redirect(`${APP_BP}/${team.slug}/workspace/learn/search`);
  }

  const progressCount = await getProgress(team.id, course.id);

  return (
    <div className="flex-1 md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
      <aside className="fixed z-20 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto md:sticky md:block">
        <CourseSidebar
          course={course}
          progressCount={progressCount}
          isPaidMember={isPaidMember}
          teamSlug={team.slug}
        />
      </aside>
      {children}
    </div>
  );
};

export default PlaybookLayout;
