'use server';

import { db } from '#/lib/db';
import { getUserSubscriptionPlan } from '#/lib/subscription';
import { Attachment, Chapter } from '@prisma/client';

interface GetChapterProps {
  userId: string;
  courseId: string;
  chapterId: string;
}

export const getChapter = async ({
  userId,
  courseId,
  chapterId,
}: GetChapterProps) => {
  try {
    const course = await db.course.findUnique({
      where: {
        isPublished: true,
        id: courseId,
      },
      cacheStrategy: {
        ttl: 3600,
        swr: 300,
      },
    });

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        isPublished: true,
      },
      cacheStrategy: {
        ttl: 3600,
        swr: 300,
      },
    });

    if (!chapter || !course) {
      throw new Error('Play or playbook not found');
    }

    const userSubscriptionPlan = await getUserSubscriptionPlan(userId);
    const isPaidMember = userSubscriptionPlan.isPaid;

    let muxData = null;
    let attachments: Attachment[] = [];
    let nextChapter: Chapter | null = null;

    if (course.price === 0 || isPaidMember) {
      attachments = await db.attachment.findMany({
        where: {
          courseId: courseId,
        },
        cacheStrategy: {
          ttl: 3600,
          swr: 300,
        },
      });
    }

    if (course.price === 0 || isPaidMember) {
      muxData = await db.muxData.findUnique({
        where: {
          chapterId: chapterId,
        },
        cacheStrategy: {
          ttl: 3600,
          swr: 300,
        },
      });

      nextChapter = await db.chapter.findFirst({
        where: {
          courseId: courseId,
          isPublished: true,
          position: {
            gt: chapter?.position,
          },
        },
        orderBy: {
          position: 'asc',
        },
        cacheStrategy: {
          ttl: 3600,
          swr: 300,
        },
      });
    }

    const userProgress = await db.userProgress.findUnique({
      where: {
        userId_chapterId: {
          userId,
          chapterId,
        },
      },
    });

    return {
      chapter,
      course,
      muxData,
      attachments,
      nextChapter,
      userProgress,
      isPaidMember,
    };
  } catch (error) {
    return {
      chapter: null,
      course: null,
      muxData: null,
      attachments: [],
      nextChapter: null,
      userProgress: null,
      isPaidMember: false,
    };
  }
};
