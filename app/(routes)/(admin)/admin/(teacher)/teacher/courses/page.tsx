import { Metadata } from 'next';

import { DashboardHeader } from '@/app/components/dashboard/header';
import { DashboardShell } from '@/app/components/dashboard/shell';
import { teacherCourseListColumns } from '@/app/components/learn/teacher/teacher-course-list-columns';
import { TeacherCourseListDataTable } from '@/app/components/learn/teacher/teacher-course-list-data-table';
import { db } from '@/app/lib/db';

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
    cacheStrategy: {
      ttl: 1800,
      swr: 300,
    },
  });

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Playbooks admin"
        text="The place to make digital marketing awesome again."
      />
      <TeacherCourseListDataTable
        columns={teacherCourseListColumns}
        data={courses}
      />
    </DashboardShell>
  );
};

export default CoursesPage;
