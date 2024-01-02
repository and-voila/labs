import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { APP_BP } from '#/lib/const';
import { db } from '#/lib/db';

import { DashboardHeader } from '#/components/dashboard/header';
import { Banner } from '#/components/learn/dashboard/banner';
import { Section } from '#/components/learn/dashboard/section';
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
    <div className="flex flex-col gap-8">
      {!course.isPublished && (
        <Banner label="This playbook ain't published. No one will be able to see it yo." />
      )}
      <DashboardHeader
        title="Playbook setup"
        description="Create or manage playbooks."
      >
        <div className="flex flex-col items-center justify-between gap-2">
          <Actions
            disabled={!isComplete}
            courseId={params.courseId}
            isPublished={course.isPublished}
          />
          <p className="text-xs text-muted-foreground">
            Fields completed {completionText}
          </p>
        </div>
      </DashboardHeader>
      <div className="my-8 grid max-w-4xl gap-12 md:my-12">
        <Section title="Customize your playbook" icon="magic">
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
        </Section>
        <Section title="Playbook chapters" icon="activity">
          <ChaptersForm initialData={course} courseId={course.id} />
        </Section>
        <Section title="Playbook access" icon="rocket">
          <PriceForm initialData={course} courseId={course.id} />
        </Section>
        <Section title="Attachments" icon="file">
          <AttachmentForm initialData={course} courseId={course.id} />
        </Section>
      </div>
    </div>
  );
};

export default CourseIdPage;
