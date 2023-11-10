import { Category, Chapter, Course } from '@prisma/client';

import { checkSubscription } from '@/app/lib/actions/check-subscription';
import { getProgress } from '@/app/lib/actions/get-progress';
import { db } from '@/app/lib/db';

type DashboardCourseWithProgressWithCategory = Course & {
  category: Category;
  chapters: Chapter[];
  progress: number | null;
  isPaidMember: boolean;
  purchased: boolean;
};

type DashboardCourses = {
  completedCourses: DashboardCourseWithProgressWithCategory[];
  coursesInProgress: DashboardCourseWithProgressWithCategory[];
};

export const getDashboardCourses = async (
  userId: string,
): Promise<DashboardCourses> => {
  try {
    const userProgress = await db.userProgress.findMany({
      where: { userId },
      select: { chapterId: true, isCompleted: true, isStarted: true },
    });

    const chapterIdsWithProgress = userProgress.map(
      (progress) => progress.chapterId,
    );

    const courses = await db.course.findMany({
      where: {
        chapters: {
          some: {
            id: {
              in: chapterIdsWithProgress,
            },
          },
        },
      },
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
        },
        purchases: true,
      },
    });

    const coursesWithProgress = await Promise.all(
      courses.map(async (course) => {
        const progress = await getProgress(userId, course.id);
        const purchased = course.purchases.some(
          (purchase) => purchase.userId === userId,
        );
        const isPaidMember = await checkSubscription();
        return {
          ...course,
          progress,
          purchased,
          isPaidMember,
        } as DashboardCourseWithProgressWithCategory;
      }),
    );

    const completedCourses = coursesWithProgress.filter(
      (course) => course.progress === 100,
    );
    const coursesInProgress = coursesWithProgress.filter(
      (course) => (course.progress ?? 0) < 100,
    );

    return {
      completedCourses,
      coursesInProgress,
    };
  } catch (error) {
    return {
      completedCourses: [],
      coursesInProgress: [],
    };
  }
};
