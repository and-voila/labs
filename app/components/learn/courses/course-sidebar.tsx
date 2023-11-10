import { redirect } from 'next/navigation';

import { FreeCounter } from '@/app/components/free-counter';
import { CourseProgress } from '@/app/components/learn/courses/course-progress';
import { Logo } from '@/app/components/logo-square';
import { db } from '@/app/lib/db';
import { getCurrentUser } from '@/app/lib/session';
import { ChapterType, CourseSidebarProps } from '@/app/lib/types';

import { CourseSidebarItem } from './course-sidebar-item';

export const CourseSidebar = async ({
  course,
  progressCount,
  apiLimitCount,
  isPaidMember = false,
}: CourseSidebarProps) => {
  const user = await getCurrentUser();
  const userId = user?.id;

  if (!userId) {
    return redirect('/');
  }

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
    <div className="flex h-full flex-col overflow-y-auto bg-[#d0d5dd] shadow-sm dark:bg-[#010101]">
      <div className="flex items-center p-6">
        <Logo fillOnHover className="h-6 md:h-8" />
        <sup className="-ml-2 font-mono text-xs text-brand md:-ml-3">beta</sup>
      </div>
      <div className="flex flex-col border-y bg-primary-foreground p-8">
        <p className="mb-2 font-mono text-xs text-muted-foreground">Playbook</p>
        <h1 className="text-lg font-semibold">{course.title}</h1>
        {(isPaidMember || purchase || course.price === 0) && (
          <div className="mt-10">
            <CourseProgress
              variant={isComplete ? 'success' : 'default'}
              value={progressCount}
            />
          </div>
        )}
      </div>
      <div className="mt-4 flex w-full flex-col">
        <p className="mb-2 px-8 font-mono text-xs text-muted-foreground">
          Topic
        </p>
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
