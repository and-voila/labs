'use server';

import { Attachment, Chapter } from '@prisma/client';

import { db } from '#/lib/db';
import { getTeamSubscriptionPlan } from '#/lib/operations/subsctiptions/subscription';

interface GetChapterProps {
  teamId: string;
  courseId: string;
  chapterId: string;
}

export const getChapter = async ({
  teamId,
  courseId,
  chapterId,
}: GetChapterProps) => {
  try {
    const course = await db.course.findUnique({
      where: {
        isPublished: true,
        id: courseId,
      },
    });

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        isPublished: true,
      },
    });

    if (!chapter || !course) {
      throw new Error('Play or playbook not found');
    }

    const userSubscriptionPlan = await getTeamSubscriptionPlan(teamId);
    const isPaidMember = userSubscriptionPlan.isPaid;

    let muxData = null;
    let attachments: Attachment[] = [];
    let nextChapter: Chapter | null = null;

    if (course.price === 0 || isPaidMember) {
      attachments = await db.attachment.findMany({
        where: {
          courseId: courseId,
        },
      });
    }

    if (course.price === 0 || isPaidMember) {
      muxData = await db.muxData.findUnique({
        where: {
          chapterId: chapterId,
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
      });
    }

    const userProgress = await db.userProgress.findUnique({
      where: {
        teamId_chapterId: {
          teamId,
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
