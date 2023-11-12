import { DashboardHeader } from '@/app/components/dashboard/header';
import { DashboardShell } from '@/app/components/dashboard/shell';

export default function PlaybookTitleLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="New Playbook" text="Loading up the widgets." />
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-medium tracking-tight text-foreground">
          Just like Moira&apos;s wigs, we&apos;re getting things ready for you.
        </h2>
      </div>
    </DashboardShell>
  );
}
