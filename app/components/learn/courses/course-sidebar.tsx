import { redirect } from 'next/navigation';

import { FreeCounter } from '@/app/components/free-counter';
import { CourseProgress } from '@/app/components/learn/courses/course-progress';
import { authOptions } from '@/app/lib/auth';
import { db } from '@/app/lib/db';
import { getSession } from '@/app/lib/session';
import { ChapterType, CourseSidebarProps } from '@/app/lib/types';

import { CourseSidebarItem } from './course-sidebar-item';

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

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id,
      },
    },
  });

  const isComplete = progressCount === 100;

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto">
      <div className="flex flex-col py-4">
        <p className="mb-2 text-sm text-brand">Playbook</p>
        <h1 className="font-medium leading-tight lg:leading-tight">
          {course.title}
        </h1>
        {(isPaidMember || purchase || course.price === 0) && (
          <div className="mt-6">
            <CourseProgress
              variant={isComplete ? 'success' : 'default'}
              value={progressCount}
            />
          </div>
        )}
      </div>
      <div className="mt-4 flex w-full flex-col">
        <p className="mb-2 text-sm text-brand">On deck</p>
        {course.chapters.map((chapter: ChapterType) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={course.id}
            isLocked={course.price !== 0 && !(isPaidMember || purchase)}
          />
        ))}
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
