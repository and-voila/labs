import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { env } from ':/env.mjs';
import { authOptions } from '#/lib/auth';
import { db } from '#/lib/db';
import { getSession } from '#/lib/session';
import { getUserSubscriptionPlan } from '#/lib/subscription';
import { cn, placeholderBlurhash } from '#/lib/utils';
import { Banner } from '#/components/banner';
import { DashboardShell } from '#/components/dashboard/shell';
import { StartCourseButton } from '#/components/learn/courses/start-course-button';
import { Preview } from '#/components/preview';
import { buttonVariants } from '#/components/ui/button';
import { Separator } from '#/components/ui/separator';
import BlurImage from '#/components/write/blur-image';

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const session = await getSession();
  if (!session) {
    redirect(authOptions?.pages?.signIn || '/login');
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
    cacheStrategy: {
      ttl: 3600,
      swr: 60,
    },
  });

  const userProgress = await db.userProgress.findFirst({
    where: {
      userId: session.user.id,
      chapterId: course?.chapters[0].id,
    },
  });

  if (!course) {
    return redirect('/learn/search');
  }

  const userSubscriptionPlan = await getUserSubscriptionPlan(session.user.id);
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
            <div className="flex flex-col items-center justify-between p-4 lg:flex-row">
              <h2 className="mb-2 text-2xl font-bold tracking-tight">
                {course.title}
              </h2>
              <div className="flex w-full flex-col items-center gap-x-4 space-y-6 py-4 sm:py-0 lg:w-auto lg:flex-row lg:space-y-0 lg:p-6">
                <Link
                  href="/pricing"
                  className={cn(
                    buttonVariants({ size: 'lg' }),
                    'w-full lg:w-auto',
                  )}
                >
                  Upgrade
                </Link>
              </div>
            </div>
            <Separator />
            <div>
              <Preview value={course.description!} />
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
            <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
              <div className="ml-4 mt-2">
                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                  {course.title}
                </h2>
              </div>
              <div className="ml-4 mt-2 w-full flex-shrink-0 sm:w-auto">
                <StartCourseButton
                  chapterId={course.chapters[0].id}
                  courseId={course.id}
                  isStarted={isStarted}
                  firstChapterId={course.chapters[0].id}
                />
              </div>
            </div>
            <Separator className="my-6" />
            <div>
              <Preview value={course.description!} />
            </div>
          </div>
        </div>
      </DashboardShell>
    );
  } else {
    return redirect(
      `/learn/courses/${course.id}/chapters/${course.chapters[0].id}`,
    );
  }
};

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
    'Access the And Voila Dashboard for advanced marketing playbooks, effective AI tools, and to mingle in the best digital marketing Discord.';

  const baseUrl =
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001';

  const ogImageUrl = new URL(`${baseUrl}/api/og`);
  ogImageUrl.searchParams.set('title', title);

  const courseUrl = `${baseUrl}/learn/courses/${params.courseId}`;

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

export default CourseIdPage;
