import { DashboardHeader } from '@/app/components/dashboard/header';
import { DashboardShell } from '@/app/components/dashboard/shell';

export default function CourseIdPageLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Customize the playbook"
        text="Just a sec, firing things up..."
      />
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-medium tracking-tight text-foreground">
          Hold on, we&apos;re finding the best route to the Rosebud Motel.
        </h2>
      </div>
    </DashboardShell>
  );
}
