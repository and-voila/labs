import { DashboardHeader } from '@/app/components/dashboard/header';
import { DashboardShell } from '@/app/components/dashboard/shell';
import { CardSkeleton } from '@/app/components/shared/card-skeleton';
import { Button } from '@/app/components/ui/button';

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashboard"
        text="Head over to Discord, check out a playbook, or start publishing."
      >
        <Button>Fake button</Button>
      </DashboardHeader>
      <div className="divide-border-200 divide-y rounded-md border">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </DashboardShell>
  );
}
