import { DashboardHeader } from '#/components/dashboard/header';
import { DashboardShell } from '#/components/dashboard/shell';
import { ToolsDashboardCardSkeleton } from '#/components/skeletons';

export default function ToolsDashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Tools"
        text="AI-powered tools to assist your workflow. They'll help you save time, safeguard your IP, and crush your ROI."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        <ToolsDashboardCardSkeleton />
        <ToolsDashboardCardSkeleton />
        <ToolsDashboardCardSkeleton />
        <ToolsDashboardCardSkeleton />
      </div>
    </DashboardShell>
  );
}
