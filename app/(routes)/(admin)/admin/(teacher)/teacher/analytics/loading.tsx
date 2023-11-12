import { DashboardHeader } from '@/app/components/dashboard/header';
import { DashboardShell } from '@/app/components/dashboard/shell';

export default function PlaybooksAdminLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Playbooks Analytics"
        text="Crunch the numbers, see what's working, then iterate."
      />
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-medium tracking-tight text-foreground">
          Just like David&apos;s sweaters, we&apos;re knitting everything
          together.
        </h2>
      </div>
    </DashboardShell>
  );
}
