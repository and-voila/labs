import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { env } from ':/env.mjs';

import { getChapter } from '#/lib/actions/get-chapter';
import { authOptions } from '#/lib/auth';
import { CP_PREFIX } from '#/lib/const';
import { db } from '#/lib/db';
import { getTeams } from '#/lib/team/get-teams';

import { Banner } from '#/components/banner';
import { DashboardShell } from '#/components/dashboard/shell';
import { CourseProgressButton } from '#/components/learn/courses/course-progress-button';
import { VideoPlayer } from '#/components/learn/courses/video-player';
import { Preview } from '#/components/preview';
import { Icons } from '#/components/shared/icons';
import { Separator } from '#/components/ui/separator';

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { user, teams } = await getTeams();
  if (!user) {
    redirect(authOptions?.pages?.signIn || '/login');
  }

  const personalTeam = teams.find((team) => team.isPersonal);

  if (!personalTeam) {
    throw new Error('No personal team found');
  }

  const { chapter, course, muxData, attachments, nextChapter, userProgress } =
    await getChapter({
      teamId: personalTeam.id,
      chapterId: params.chapterId,
      courseId: params.courseId,
    });

  if (!chapter || !course) {
    return redirect('/');
  }

  const completeOnEnd = !userProgress?.isCompleted;

  return (
    <DashboardShell>
      <div className="flex flex-col pb-20">
        {userProgress?.isCompleted && (
          <Banner variant="success" label="You've completed this play." />
        )}
        <div className="mb-4 mt-8">
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
        <div className="rounded-xl bg-card p-6 lg:p-8">
          <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between space-y-4 p-4 sm:flex-nowrap">
            <div className="ml-4 mt-2">
              <h2 className="mb-2 text-2xl font-bold leading-tight">
                {chapter.title}
              </h2>
            </div>
            <div className="ml-4 mt-2 w-full sm:w-auto md:flex-shrink-0">
              <CourseProgressButton
                chapterId={params.chapterId}
                courseId={params.courseId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
              />
            </div>
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
    </DashboardShell>
  );
};

export async function generateMetadata({
  params,
}: {
  params: { courseId: string; chapterId: string };
}): Promise<Metadata> {
  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
    },
    select: {
      title: true,
      description: true,
    },
  });

  if (!chapter) {
    return {};
  }

  const title = chapter.title;
  let description =
    chapter.description ??
    'Access the And Voila Dashboard for advanced marketing playbooks, effective AI tools, and to mingle in the best digital marketing Discord.';
  if (description.length > 160) {
    description = description.substring(0, 157) + '...';
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001';

  const ogImageUrl = new URL(`${baseUrl}/api/og`);
  ogImageUrl.searchParams.set('title', title);

  const chapterUrl = `${baseUrl}${CP_PREFIX}/learn/courses/${params.courseId}/chapters/${params.chapterId}`;

  const metadata = {
    title,
    description,
    openGraph: {
      type: 'article',
      title,
      description,
      images: [
        {
          url: ogImageUrl.toString(),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      url: chapterUrl,
    },
    twitter: {
      title,
      description,
      images: [
        {
          url: ogImageUrl.toString(),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };

  return metadata;
}

export default ChapterIdPage;
