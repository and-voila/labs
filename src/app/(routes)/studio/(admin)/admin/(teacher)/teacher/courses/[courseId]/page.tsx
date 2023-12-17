import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { APP_BP } from '#/lib/const';
import { db } from '#/lib/db';

import { Banner } from '#/components/banner';
import { DashboardShell } from '#/components/dashboard/shell';
import { IconBadge } from '#/components/icon-badge';
import { Actions } from '#/components/learn/teacher/courses/actions';
import { AttachmentForm } from '#/components/learn/teacher/courses/attachment-form';
import { CategoryForm } from '#/components/learn/teacher/courses/category-form';
import { ChaptersForm } from '#/components/learn/teacher/courses/chapters-form';
import { DescriptionForm } from '#/components/learn/teacher/courses/description-form';
import { ImageForm } from '#/components/learn/teacher/courses/image-form';
import { PreviewForm } from '#/components/learn/teacher/courses/preview-form';
import { PriceForm } from '#/components/learn/teacher/courses/price-form';
import { TitleForm } from '#/components/learn/teacher/courses/title-form';

export const metadata: Metadata = {
  title: 'Create Playbook',
  description:
    'Craft compelling playbooks from scratch. Set titles, previews, descriptions, and more to deliver cutting-edge marketing insights and strategies.',
};

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        orderBy: {
          position: 'asc',
        },
      },
      attachments: {
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc',
    },
    cacheStrategy: {
      ttl: 3600,
      swr: 300,
    },
  });

  if (!course) {
    return redirect(`${APP_BP}/admin/teacher/courses`);
  }

  const requiredFields = [
    course.title,
    course.preview,
    course.description,
    course.imageUrl,
    course.price !== null && course.price !== undefined,
    course.categoryId,
    course.chapters.some((chapter) => chapter.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <DashboardShell>
      <div className="bg-background] max-w-4xl ">
        {!course.isPublished && (
          <Banner label="This playbook ain't published. No one will be able to see it yo." />
        )}
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-3xl font-bold tracking-tight">
                Playbook setup
              </h1>
              <span className="text-base text-muted-foreground">
                Complete all fields {completionText}
              </span>
            </div>
            <Actions
              disabled={!isComplete}
              courseId={params.courseId}
              isPublished={course.isPublished}
            />
          </div>
          <div className="mt-16">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon="magic" />
                <h2 className="text-lg font-bold tracking-tight">
                  Customize your playbook
                </h2>
              </div>
              <TitleForm initialData={course} courseId={course.id} />
              <PreviewForm initialData={course} courseId={course.id} />
              <DescriptionForm initialData={course} courseId={course.id} />
              <ImageForm initialData={course} courseId={course.id} />
              <CategoryForm
                initialData={course}
                courseId={course.id}
                options={categories.map((category) => ({
                  label: category.name,
                  value: category.id,
                }))}
              />
            </div>
            <div className="mt-16 space-y-6">
              <div>
                <div className="flex items-center gap-x-2">
                  <IconBadge icon="activity" />
                  <h2 className="text-lg font-bold tracking-tight">
                    Playbook chapters
                  </h2>
                </div>
                <ChaptersForm initialData={course} courseId={course.id} />
              </div>
              <div>
                <div className="mt-16 flex items-center gap-x-2">
                  <IconBadge icon="rocket" />
                  <h2 className="text-lg font-bold tracking-tight">
                    Playbook access
                  </h2>
                </div>
                <PriceForm initialData={course} courseId={course.id} />
              </div>
              <div>
                <div className="mt-16 flex items-center gap-x-2">
                  <IconBadge icon="file" />
                  <h2 className="text-lg font-bold tracking-tight">
                    Resources & Attachments
                  </h2>
                </div>
                <AttachmentForm initialData={course} courseId={course.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
};

export default CourseIdPage;