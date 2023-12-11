'use server';

import { Category, Chapter, Course } from '@prisma/client';

import { getProgress } from '#/lib/actions/get-progress';
import { db } from '#/lib/db';
import { getUserSubscriptionPlan } from '#/lib/subscription';

type DashboardCourseWithProgressWithCategory = Course & {
  category: Category;
  chapters: Chapter[];
  progress: number | null;
  isPaidMember: boolean;
};

type DashboardCourses = {
  completedCourses: DashboardCourseWithProgressWithCategory[];
  coursesInProgress: DashboardCourseWithProgressWithCategory[];
  count: number;
  totalCompletedCourses: number;
  totalCoursesInProgress: number;
};

export const getDashboardCourses = async ({
  userId,
  skip = 0,
  take = 9,
}: {
  userId: string;
  skip?: number;
  take?: number;
}): Promise<DashboardCourses> => {
  try {
    const userProgress = await db.userProgress.findMany({
      where: { userId },
      select: { chapterId: true, isCompleted: true, isStarted: true },
    });

    const totalCoursesInProgress = userProgress.filter(
      (p) => p.isStarted && !p.isCompleted,
    ).length;

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
      },
      skip,
      take,
    });

    const count = await db.course.count({
      where: {
        chapters: {
          some: {
            id: {
              in: chapterIdsWithProgress,
            },
          },
        },
      },
    });

    const coursesWithProgress = await Promise.all(
      courses.map(async (course) => {
        const progress = await getProgress(userId, course.id);
        const userSubscriptionPlan = await getUserSubscriptionPlan(userId);
        const isPaidMember = userSubscriptionPlan.isPaid;
        return {
          ...course,
          progress,
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

    const totalCompletedCourses = completedCourses.length;

    return {
      completedCourses,
      coursesInProgress,
      count,
      totalCompletedCourses,
      totalCoursesInProgress,
    };
  } catch (error) {
    return {
      completedCourses: [],
      coursesInProgress: [],
      count: 0,
      totalCompletedCourses: 0,
      totalCoursesInProgress: 0,
    };
  }
};
