import { DashboardHeader } from '@/app/components/dashboard/header';
import { DashboardShell } from '@/app/components/dashboard/shell';
import { CardSkeleton } from '@/app/components/shared/card-skeleton';

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashboard"
        text="Head over to Discord, check out a playbook, or start publishing."
      />
      <div className="divide-border-200 divide-y rounded-md border">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </DashboardShell>
  );
}
