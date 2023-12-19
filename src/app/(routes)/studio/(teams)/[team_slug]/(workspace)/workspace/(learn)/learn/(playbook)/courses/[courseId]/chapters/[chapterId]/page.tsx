import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getTeam } from ':/src/lib/team/get-current-team';

import { siteConfig } from '#/config/site';

import { getChapter } from '#/lib/actions/get-chapter';
import { authOptions } from '#/lib/auth';
import { APP_BP, SITE_URL } from '#/lib/const';
import { db } from '#/lib/db';

import { Banner } from '#/components/banner';
import { CourseProgressButton } from '#/components/learn/courses/course-progress-button';
import { VideoPlayer } from '#/components/learn/courses/video-player';
import { Preview } from '#/components/preview';
import { Icons } from '#/components/shared/icons';
import { Button } from '#/components/ui/button';
import { Separator } from '#/components/ui/separator';

interface ChapterIdPageProps {
  params: { courseId: string; chapterId: string; team_slug: string };
}

const ChapterIdPage = async ({ params }: ChapterIdPageProps) => {
  const team = await getTeam(params.team_slug);

  if (!team) {
    redirect(authOptions?.pages?.signIn || '/login');
  }

  if (!team.isPersonal) {
    redirect(`${APP_BP}/${team.slug}/oops`);
  }

  const { chapter, course, muxData, attachments, nextChapter, userProgress } =
    await getChapter({
      teamId: team.id,
      chapterId: params.chapterId,
      courseId: params.courseId,
    });

  if (!chapter || !course) {
    return redirect(`${APP_BP}/${team.slug}/workspace/learn/search`);
  }

  const completeOnEnd = !userProgress?.isCompleted;

  return (
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
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 sm:truncate sm:tracking-tight">
              {course.title}
            </h2>
          </div>
          <div className="mt-4 flex md:ml-4 md:mt-0">
            <div className="inline-flex items-center">
              <Link href={`${APP_BP}/${team?.slug}/workspace/learn/search`}>
                <Button variant="secondary">
                  <Icons.signOut className="mr-2 h-4 w-4 text-primary" />
                  Exit
                </Button>
              </Link>
            </div>
            <div className="ml-3 inline-flex items-center">
              <CourseProgressButton
                chapterId={params.chapterId}
                courseId={params.courseId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
                teamSlug={params.team_slug}
              />
            </div>
          </div>
        </div>
        <Separator className="my-4" />
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
    `Access the ${siteConfig.name} Dashboard for advanced marketing playbooks, effective AI tools, and to mingle in the best digital marketing Discord.`;
  if (description.length > 160) {
    description = description.substring(0, 157) + '...';
  }

  const ogImageUrl = new URL(`${SITE_URL}/api/og`);
  ogImageUrl.searchParams.set('title', title);

  const chapterUrl = `${SITE_URL}${APP_BP}/workspace/learn/courses/${params.courseId}/chapters/${params.chapterId}`;

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
