'use server';

import { Category, Course } from '@prisma/client';

import { checkSubscription } from '@/app/lib/actions/check-subscription';
import { getProgress } from '@/app/lib/actions/get-progress';
import { db } from '@/app/lib/db';

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
  price: number;
  isPaidMember: boolean;
  purchased: boolean;
};

type GetCourses = {
  userId: string;
  title?: string;
  categoryId?: string;
  isPaidMember: boolean;
  skip?: number;
  take?: number;
};

export const getCourses = async ({
  userId,
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
        purchases: {
          where: {
            userId,
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

    const isPaidMember = await checkSubscription();

    const coursesWithProgress: CourseWithProgressWithCategory[] =
      await Promise.all(
        courses.map(async (course) => {
          const purchased = course.purchases.length > 0;
          if (isPaidMember || course.price === 0 || purchased) {
            const progressPercentage = await getProgress(userId, course.id);

            return {
              ...course,
              progress: progressPercentage,
              isPaidMember,
              purchased,
              price: course.price || 0,
            };
          }

          return {
            ...course,
            progress: null,
            isPaidMember,
            purchased,
            price: course.price || 0,
          };
        }),
      );

    return { courses: coursesWithProgress, count };
  } catch (error) {
    throw error;
  }
};
