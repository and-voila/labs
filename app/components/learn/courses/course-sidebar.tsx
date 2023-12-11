import { redirect } from 'next/navigation';

import { authOptions } from '#/lib/auth';
import { getSession } from '#/lib/session';
import { ChapterType, CourseSidebarProps } from '#/lib/types';
import { FreeCounter } from '#/components/free-counter';
import { CourseProgress } from '#/components/learn/courses/course-progress';
import { CourseSidebarItem } from '#/components/learn/courses/course-sidebar-item';

export const CourseSidebar = async ({
  course,
  progressCount,
  apiLimitCount,
  isPaidMember = false,
}: CourseSidebarProps) => {
  const session = await getSession();

  if (!session) {
    redirect(authOptions?.pages?.signIn || '/login');
  }

  const userId = session.user.id;

  const isComplete = progressCount === 100;

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto">
      <div className="flex flex-col py-4">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
          Playbook
        </p>
        <h1 className="font-medium leading-tight lg:leading-tight">
          {course.title}
        </h1>
        {(isPaidMember || course.price === 0) && (
          <div className="mt-6">
            <CourseProgress
              variant={isComplete ? 'success' : 'default'}
              value={progressCount}
            />
          </div>
        )}
      </div>
      <div className="mt-4 flex w-full flex-col">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
          On deck
        </p>
        {course.chapters.map((chapter: ChapterType) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={course.id}
            isLocked={course.price !== 0 && !isPaidMember}
          />
        ))}
        <div className="h-36" />
        <div className="absolute bottom-6">
          <FreeCounter
            isPaidMember={isPaidMember}
            apiLimitCount={apiLimitCount}
            userId={userId}
          />
        </div>
      </div>
    </div>
  );
};
