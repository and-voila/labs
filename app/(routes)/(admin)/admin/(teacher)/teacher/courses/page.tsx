import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { DashboardHeader } from '@/app/components/dashboard/header';
import { DashboardShell } from '@/app/components/dashboard/shell';
import { teacherCourseListColumns } from '@/app/components/learn/teacher/teacher-course-list-columns';
import { TeacherCourseListDataTable } from '@/app/components/learn/teacher/teacher-course-list-data-table';
import { authOptions } from '@/app/lib/auth';
import { db } from '@/app/lib/db';
import { getSession } from '@/app/lib/session';
import { isTeacher } from '@/app/lib/teacher';

export const metadata: Metadata = {
  title: 'Playbooks Admin',
  description:
    'Master the art of playbook management. Create, analyze, and refine marketing playbooks, ensuring our community stays at the forefront of digital marketing.',
};

const CoursesPage = async () => {
  const session = await getSession();
  if (!session) {
    redirect(authOptions?.pages?.signIn || '/login');
  } else if (!isTeacher(session.user.id)) {
    redirect('/not-authorized');
  }

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
