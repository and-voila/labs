import { db } from '@/app/lib/db';

export const getProgress = async (
  userId: string,
  courseId: string,
): Promise<number> => {
  try {
    const publishedChapters = await db.chapter.findMany({
      where: {
        courseId: courseId,
        isPublished: true,
      },
      select: {
        id: true,
      },
    });

    const publishedChapterIds = publishedChapters.map((chapter) => chapter.id);

    const firstChapterProgress = await db.userProgress.findFirst({
      where: {
        userId: userId,
        chapterId: publishedChapterIds[0],
      },
    });

    const isStarted = firstChapterProgress?.isStarted || false;

    const validCompletedChapters = await db.userProgress.count({
      where: {
        userId: userId,
        chapterId: {
          in: publishedChapterIds,
        },
        isCompleted: true,
      },
    });

    let progressPercentage = 0;

    if (isStarted && validCompletedChapters === 0) {
      progressPercentage = 25;
    } else if (isStarted && validCompletedChapters > 0) {
      progressPercentage =
        (validCompletedChapters / publishedChapterIds.length) * 100;
    } else if (!isStarted) {
      progressPercentage = 0;
    }

    return progressPercentage;
  } catch (error) {
    return 0;
  }
};
