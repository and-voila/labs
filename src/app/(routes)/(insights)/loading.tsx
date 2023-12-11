import { Icons } from '#/components/shared/icons';

export default function InsightsLoading() {
  return (
    <div className="flex h-96 items-center justify-center bg-background">
      <Icons.spinner className="h-16 w-16 animate-spin text-primary" />
    </div>
  );
}
