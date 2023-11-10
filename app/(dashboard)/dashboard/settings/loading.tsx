import { DashboardHeader } from '@/components/dashboard/header';
import { DashboardShell } from '@/components/dashboard/shell';
import { CardSkeleton } from '@/components/shared/card-skeleton';

export default function DashboardSettingsLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <div className="grid max-w-3xl gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  );
}
