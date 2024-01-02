import { Metadata } from 'next';

import { db } from '#/lib/db';

import { DashboardHeader } from '#/components/dashboard/header';
import { teacherCourseListColumns } from '#/components/learn/teacher/teacher-course-list-columns';
import { TeacherCourseListDataTable } from '#/components/learn/teacher/teacher-course-list-data-table';

export const metadata: Metadata = {
  title: 'Playbooks Admin',
  description:
    'Master the art of playbook management. Create, analyze, and refine marketing playbooks, ensuring our community stays at the forefront of digital marketing.',
};

const CoursesPage = async () => {
  const courses = await db.course.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="flex flex-col gap-8">
      <DashboardHeader
        title="Playbooks admin"
        description="The place to make digital marketing awesome again."
      />
      <TeacherCourseListDataTable
        columns={teacherCourseListColumns}
        data={courses}
      />
    </div>
  );
};

export default CoursesPage;
