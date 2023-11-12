import { DashboardHeader } from '@/app/components/dashboard/header';
import { DashboardShell } from '@/app/components/dashboard/shell';

export default function AdminPageLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Admin center" text="Loading up the widgets." />
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-medium tracking-tight text-foreground">
          Grabbing a 🌮, BRB...
        </h2>
      </div>
    </DashboardShell>
  );
}
