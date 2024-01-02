import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { APP_BP } from '#/lib/const';
import { db } from '#/lib/db';

import { DashboardHeader } from '#/components/dashboard/header';
import { Banner } from '#/components/learn/dashboard/banner';
import { Section } from '#/components/learn/dashboard/section';
import { ChapterActions } from '#/components/learn/teacher/chapters/chapter-actions';
import { ChapterDescriptionForm } from '#/components/learn/teacher/chapters/chapter-description-form';
import { ChapterTitleForm } from '#/components/learn/teacher/chapters/chapter-title-form';
import { ChapterVideoForm } from '#/components/learn/teacher/chapters/chapter-video-form';

export const metadata: Metadata = {
  title: 'Create Play',
  description:
    'Shape each Play with precision. Add titles, detailed content, videos, and more to enrich your playbook with actionable marketing insights.',
};

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
    include: {
      muxData: true,
    },
    cacheStrategy: {
      ttl: 60,
      swr: 30,
    },
  });

  if (!chapter) {
    return redirect(`${APP_BP}/admin/teacher/courses`);
  }

  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <div className="flex flex-col gap-8">
      {!chapter.isPublished && (
        <Banner
          variant="warning"
          label="This play ain't published yet. No one can take it until it is."
        />
      )}
      <DashboardHeader title="Play setup" description="Create or manage plays.">
        <div className="flex flex-col items-center justify-between gap-2" />
        <div className="flex items-start justify-between gap-2">
          <div className="flex w-full flex-col items-center justify-between gap-2 md:w-auto">
            <ChapterActions
              disabled={!isComplete}
              courseId={params.courseId}
              chapterId={params.chapterId}
              isPublished={chapter.isPublished}
            />
            <p className="text-xs text-muted-foreground">
              Fields completed {completionText}
            </p>
          </div>
        </div>
      </DashboardHeader>

      <div className="my-8 grid max-w-4xl gap-12 md:my-12">
        <Section title="Customize your play" icon="magic">
          <ChapterTitleForm
            initialData={chapter}
            courseId={params.courseId}
            chapterId={params.chapterId}
          />
          <ChapterDescriptionForm
            initialData={chapter}
            courseId={params.courseId}
            chapterId={params.chapterId}
          />
        </Section>
        <Section title="Add a video" icon="youtube">
          <ChapterVideoForm
            initialData={chapter}
            chapterId={params.chapterId}
            courseId={params.courseId}
          />
        </Section>
      </div>
    </div>
  );
};

export default ChapterIdPage;
