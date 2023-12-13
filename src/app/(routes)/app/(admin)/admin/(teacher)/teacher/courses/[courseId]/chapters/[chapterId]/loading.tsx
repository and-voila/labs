import { DashboardHeader } from '#/components/dashboard/header';
import { DashboardShell } from '#/components/dashboard/shell';
import { Icons } from '#/components/shared/icons';

export default function ChapterIdPageLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Setup the play"
        text="Ugh, this might take a minute..."
      />
      <div className="flex h-96 items-center justify-center bg-background">
        <Icons.spinner className="h-16 w-16 animate-spin text-primary" />
      </div>
    </DashboardShell>
  );
}
