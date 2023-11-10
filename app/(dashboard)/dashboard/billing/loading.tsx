import { DashboardHeader } from '@/components/dashboard/header';
import { DashboardShell } from '@/components/dashboard/shell';
import { CardSkeleton } from '@/components/shared/card-skeleton';

export default function DashboardBillingLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Billing"
        text="Manage billing and your subscription plan."
      />
      <div className="grid max-w-3xl gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  );
}
