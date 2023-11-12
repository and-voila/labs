import { DashboardHeader } from '@/app/components/dashboard/header';
import { DashboardShell } from '@/app/components/dashboard/shell';
import { CardSkeleton } from '@/app/components/shared/card-skeleton';

export default function DashboardSupportLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Live support"
        text="Hit us up on Discord for real-life support from...you guessed it, real people."
      />
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </DashboardShell>
  );
}
