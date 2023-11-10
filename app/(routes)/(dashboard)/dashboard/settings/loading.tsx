import { DashboardHeader } from '@/app/components/dashboard/header';
import { DashboardShell } from '@/app/components/dashboard/shell';
import { CardSkeleton } from '@/app/components/shared/card-skeleton';

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
