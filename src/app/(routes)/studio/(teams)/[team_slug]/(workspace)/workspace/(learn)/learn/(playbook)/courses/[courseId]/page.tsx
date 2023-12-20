import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { siteConfig } from '#/config/site';

import { authOptions } from '#/lib/auth';
import { APP_BP, SITE_URL } from '#/lib/const';
import { db } from '#/lib/db';
import { getTeamSubscriptionPlan } from '#/lib/operations/subsctiptions/subscription';
import { getTeam } from '#/lib/operations/teams/get-current-team';
import { cn, placeholderBlurhash } from '#/lib/utils';

import { DashboardShell } from '#/components/dashboard/shell';
import { Banner } from '#/components/learn/dashboard/banner';
import { StartCourseButton } from '#/components/learn/dashboard/start-course-button';
import { QuillPreview } from '#/components/learn/teacher/courses/quill-preview';
import BlurImage from '#/components/publish/blur-image';
import { Icons } from '#/components/shared/icons';
import { Button, buttonVariants } from '#/components/ui/button';
import { Separator } from '#/components/ui/separator';

interface CourseIdPageProps {
  params: { courseId: string; team_slug: string };
}

const CourseIdPage = async ({ params }: CourseIdPageProps) => {
  const team = await getTeam(params.team_slug);

  if (!team) {
    redirect(authOptions?.pages?.signIn || '/login');
  }

  if (!team.isPersonal) {
    redirect(`${APP_BP}/${team.slug}/oops`);
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
      },
    },
  });

  const userProgress = await db.userProgress.findFirst({
    where: {
      teamId: team.id,
      chapterId: course?.chapters[0].id,
    },
  });

  if (!course) {
    return redirect(`${APP_BP}/${team.slug}/workspace/learn/search`);
  }

  const userSubscriptionPlan = await getTeamSubscriptionPlan(team.id);
  const isPaidMember = userSubscriptionPlan.isPaid;

  const isLocked = course.price !== 0 && !isPaidMember;

  const isStarted = userProgress?.isStarted || false;

  if (isLocked) {
    return (
      <DashboardShell>
        <div className="flex flex-col pb-20">
          {' '}
          <Banner
            variant="warning"
            label={
              'This playbook is only available with a paid membership. Upgrade or check out the library of free playbooks.'
            }
          />
          <BlurImage
            className="mb-4 mt-8 w-full shadow-md grayscale transition duration-200 hover:grayscale-0"
            src={course.imageUrl!}
            alt={`A featured image of an anthropomorphic cat representing ${course.title}`}
            width={1200}
            height={630}
            role="img"
            aria-label={`A featured image of an anthropomorphic cat representing ${course.title}`}
            placeholder="blur"
            blurDataURL={placeholderBlurhash}
          />
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
                  <Link
                    href="/pricing"
                    className={cn(buttonVariants(), 'w-full lg:w-auto')}
                  >
                    Upgrade
                  </Link>
                </div>
              </div>
            </div>
            <Separator />
            <div>
              <QuillPreview value={course.description!} />
            </div>
          </div>
        </div>
      </DashboardShell>
    );
  } else if (!isStarted && !isLocked) {
    return (
      <DashboardShell>
        <div className="flex flex-col pb-20">
          <BlurImage
            className="mb-4 mt-8 w-full shadow-md grayscale transition duration-200 hover:grayscale-0"
            src={course.imageUrl!}
            alt={`A featured image of an anthropomorphic cat representing ${course.title}`}
            width={1200}
            height={630}
            role="img"
            aria-label={`A featured image of an anthropomorphic cat representing ${course.title}`}
            placeholder="blur"
            blurDataURL={placeholderBlurhash}
          />
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
                  <StartCourseButton
                    chapterId={course.chapters[0].id}
                    courseId={course.id}
                    isStarted={isStarted}
                    firstChapterId={course.chapters[0].id}
                    teamId={team.id}
                    teamSlug={team.slug}
                  />
                </div>
              </div>
            </div>
            <Separator className="my-6" />
            <div>
              <QuillPreview value={course.description!} />
            </div>
          </div>
        </div>
      </DashboardShell>
    );
  } else {
    return redirect(
      `${APP_BP}/${team.slug}/workspace/learn/courses/${course.id}/chapters/${course.chapters[0].id}`,
    );
  }
};

export default CourseIdPage;

export async function generateMetadata({
  params,
}: {
  params: { courseId: string };
}): Promise<Metadata> {
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    select: {
      title: true,
      preview: true,
    },
  });

  if (!course) {
    return {};
  }

  const title = course.title;
  const description =
    course.preview ??
    `Access the ${siteConfig.name} Dashboard for advanced marketing playbooks, effective AI tools, and to mingle in the best digital marketing Discord.`;

  const ogImageUrl = new URL(`${SITE_URL}/api/og`);
  ogImageUrl.searchParams.set('title', title);

  const courseUrl = `${SITE_URL}${APP_BP}/workspace/learn/courses/${params.courseId}`;

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
      url: courseUrl,
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
