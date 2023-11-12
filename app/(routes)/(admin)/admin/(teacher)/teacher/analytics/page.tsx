import { redirect } from 'next/navigation';

import { DashboardHeader } from '@/app/components/dashboard/header';
import { DashboardShell } from '@/app/components/dashboard/shell';
import { TeacherAnalyticsChart } from '@/app/components/learn/teacher/teacher-analytics-chart';
import { TeacherAnalyticsDataCard } from '@/app/components/learn/teacher/teacher-analytics-data-card';
import { getAnalytics } from '@/app/lib/actions/get-analytics';
import { getCurrentUser } from '@/app/lib/session';
import { isTeacher } from '@/app/lib/teacher';

const AnalyticsPage = async () => {
  const user = await getCurrentUser();
  const userId = user?.id;

  if (!isTeacher(userId)) {
    return redirect('/not-authorized');
  }

  const { data, totalRevenue, totalSales } = await getAnalytics();

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Playbooks Analytics"
        text="Crunch the numbers, see what's working, then iterate."
      />
      <div className="p-6">
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <TeacherAnalyticsDataCard
            label="Total Revenue"
            value={totalRevenue}
            shouldFormat
          />
          <TeacherAnalyticsDataCard label="Total Sales" value={totalSales} />
        </div>
        <TeacherAnalyticsChart data={data} />
      </div>
    </DashboardShell>
  );
};

export default AnalyticsPage;
