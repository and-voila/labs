import { DashboardHeader } from '#/components/dashboard/header';
import { DashboardShell } from '#/components/dashboard/shell';
import { teacherCourseListColumns } from '#/components/learn/teacher/teacher-course-list-columns';
import { TeacherCourseListDataTable } from '#/components/learn/teacher/teacher-course-list-data-table';
import { db } from '#/lib/db';
import { Metadata } from 'next';

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
