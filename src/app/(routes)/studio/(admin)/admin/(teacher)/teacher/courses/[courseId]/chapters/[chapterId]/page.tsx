import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { APP_BP } from '#/lib/const';
import { db } from '#/lib/db';

import { Banner } from '#/components/banner';
import { DashboardShell } from '#/components/dashboard/shell';
import { IconBadge } from '#/components/icon-badge';
import { ChapterActions } from '#/components/learn/teacher/chapters/chapter-actions';
import { ChapterDescriptionForm } from '#/components/learn/teacher/chapters/chapter-description-form';
import { ChapterTitleForm } from '#/components/learn/teacher/chapters/chapter-title-form';
import { ChapterVideoForm } from '#/components/learn/teacher/chapters/chapter-video-form';
import { Icons } from '#/components/shared/icons';
import { Button } from '#/components/ui/button';

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
    <DashboardShell>
      <div className="max-w-4xl bg-background">
        {!chapter.isPublished && (
          <Banner
            variant="warning"
            label="This play ain't published yet. No one can take it until it is."
          />
        )}
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="w-full">
              <Link href={`${APP_BP}/admin/teacher/courses/${params.courseId}`}>
                <Button variant="outline" className="mb-6">
                  <Icons.arrowLeft className="mr-2 h-4 w-4 text-primary" />
                  Back to playbook setup
                </Button>
              </Link>
              <div className="mt-6 flex w-full items-center justify-between">
                <div className="flex flex-col gap-y-2">
                  <h1 className="text-2xl font-bold tracking-tight">
                    Create a play
                  </h1>
                  <span className="text-base text-muted-foreground">
                    Complete all fields {completionText}
                  </span>
                </div>
                <ChapterActions
                  disabled={!isComplete}
                  courseId={params.courseId}
                  chapterId={params.chapterId}
                  isPublished={chapter.isPublished}
                />
              </div>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-x-2">
                  <IconBadge icon="magic" />
                  <h2 className="text-xl font-bold tracking-tight">
                    Customize your play
                  </h2>
                </div>
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
              </div>
            </div>
            <div>
              <div className="mt-16 flex items-center gap-x-2">
                <IconBadge icon="youtube" />
                <h2 className="text-xl font-bold tracking-tight">
                  Add a video
                </h2>
              </div>
              <ChapterVideoForm
                initialData={chapter}
                chapterId={params.chapterId}
                courseId={params.courseId}
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
};

export default ChapterIdPage;
