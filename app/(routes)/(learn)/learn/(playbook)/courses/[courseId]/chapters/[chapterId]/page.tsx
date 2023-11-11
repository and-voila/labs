import { redirect } from 'next/navigation';

import { Banner } from '@/app/components/banner';
import { Container } from '@/app/components/container';
import { CourseProgressButton } from '@/app/components/learn/courses/course-progress-button';
import { VideoPlayer } from '@/app/components/learn/courses/video-player';
import { Preview } from '@/app/components/preview';
import { Icons } from '@/app/components/shared/icons';
import { Separator } from '@/app/components/ui/separator';
import { getChapter } from '@/app/lib/actions/get-chapter';
import { getCurrentUser } from '@/app/lib/session';

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const user = await getCurrentUser();
  const userId = user?.id;

  if (!userId) {
    return redirect('/');
  }

  const {
    chapter,
    course,
    muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapter({
    userId,
    chapterId: params.chapterId,
    courseId: params.courseId,
  });

  if (!chapter || !course) {
    return redirect('/');
  }

  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  return (
    <div>
      <Container>
        <div className="mx-auto flex flex-col pb-20">
          {userProgress?.isCompleted && (
            <Banner variant="success" label="You've completed this playbook." />
          )}
          <div className="mb-4 mt-10">
            <VideoPlayer
              chapterId={params.chapterId}
              title={chapter.title}
              courseId={params.courseId}
              nextChapterId={nextChapter?.id}
              // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
              playbackId={muxData?.playbackId!}
              completeOnEnd={completeOnEnd}
            />
          </div>
          <div className="rounded-xl bg-white p-6 dark:bg-background lg:p-8">
            <div className="flex flex-col items-center justify-between space-y-4 p-4 lg:flex-row lg:space-y-0">
              <h2 className="mb-2 flex-grow text-3xl font-bold tracking-tight">
                {chapter.title}
              </h2>
              <CourseProgressButton
                chapterId={params.chapterId}
                courseId={params.courseId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
              />
            </div>
            <Separator />
            <div>
              <Preview value={chapter.description!} />
            </div>
            {!!attachments.length && (
              <>
                <Separator />
                <div className="p-4">
                  {attachments.length > 0 && (
                    <div className="mt-16 flex items-center gap-x-2">
                      <h2 className="text-lg font-bold tracking-tight">
                        Resources & Attachments
                      </h2>
                    </div>
                  )}
                  {attachments.map((attachment) => (
                    <a
                      href={attachment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={attachment.id}
                      className="mt-8 flex w-full items-center rounded-md border p-3 text-foreground hover:underline"
                    >
                      <Icons.file />
                      <p className="ml-2 line-clamp-1">{attachment.name}</p>
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ChapterIdPage;
