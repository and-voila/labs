import { DashboardHeader } from '@/app/components/dashboard/header';
import { DashboardShell } from '@/app/components/dashboard/shell';
import { Icons } from '@/app/components/shared/icons';

export default function PlaybooksAdminLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Playbooks admin"
        text="The place to make digital marketing awesome again"
      />
      <div className="flex h-96 items-center justify-center bg-background">
        <Icons.spinner className="h-16 w-16 animate-spin text-primary" />
      </div>
    </DashboardShell>
  );
}
