'use server';

import { Category, Course } from '@prisma/client';

import { getProgress } from '#/lib/actions/get-progress';
import { db } from '#/lib/db';
import { getUserSubscriptionPlan } from '#/lib/subscription';

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
  price: number;
  isPaidMember: boolean;
};

type GetCourses = {
  teamId: string;
  title?: string;
  categoryId?: string;
  isPaidMember: boolean;
  skip?: number;
  take?: number;
};

export const getCourses = async ({
  teamId,
  title,
  categoryId,
  skip = 0,
  take = 9,
}: GetCourses): Promise<{
  courses: CourseWithProgressWithCategory[];
  count: number;
}> => {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title,
          mode: 'insensitive',
        },
        categoryId,
      },
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      cacheStrategy: {
        ttl: 3600,
        swr: 300,
      },
      skip,
      take,
    });

    const count = await db.course.count({
      where: {
        isPublished: true,
        ...(title
          ? {
              title: {
                contains: title,
                mode: 'insensitive',
              },
            }
          : {}),
        ...(categoryId ? { categoryId } : {}),
      },
    });

    const userSubscriptionPlan = await getUserSubscriptionPlan(teamId);
    const isPaidMember = userSubscriptionPlan.isPaid;

    const coursesWithProgress: CourseWithProgressWithCategory[] =
      await Promise.all(
        courses.map(async (course) => {
          if (isPaidMember || course.price === 0) {
            const progressPercentage = await getProgress(teamId, course.id);

            return {
              ...course,
              progress: progressPercentage,
              isPaidMember,
              price: course.price || 0,
            };
          }

          return {
            ...course,
            progress: null,
            isPaidMember,
            price: course.price || 0,
          };
        }),
      );

    return { courses: coursesWithProgress, count };
  } catch (error) {
    throw error;
  }
};
