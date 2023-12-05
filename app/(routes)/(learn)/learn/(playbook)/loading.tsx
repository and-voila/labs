import { Icons } from '@/app/components/shared/icons';

export default function PlaybookLoading() {
  return (
    <div className="flex h-96 items-center justify-center bg-background">
      <Icons.spinner className="h-16 w-16 animate-spin text-primary" />
    </div>
  );
}
