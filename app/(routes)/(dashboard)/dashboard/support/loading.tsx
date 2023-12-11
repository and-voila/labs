import { DashboardHeader } from '#/components/dashboard/header';
import { DashboardShell } from '#/components/dashboard/shell';
import { CardSkeleton } from '#/components/shared/card-skeleton';

export default function DashboardSupportLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Support"
        text="Need help with something? No problem, hit us up and we'll give you a hand, or two."
      />
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </DashboardShell>
  );
}
