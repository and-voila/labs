'use client';

import { usePathname, useRouter } from 'next/navigation';

import { CourseSidebarItemProps } from '@/app/lib/types';
import { cn } from '@/app/lib/utils';

export const CourseSidebarItem = ({
  label,
  id,
  isCompleted,
  courseId,
}: CourseSidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = pathname?.includes(id);

  const onClick = () => {
    router.push(`/learn/courses/${courseId}/chapters/${id}`);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        'flex items-center gap-x-2 rounded-sm text-left text-sm leading-tight text-muted-foreground transition-all hover:bg-gray-400/20 hover:text-foreground',
        isActive &&
          'bg-primary/20 text-foreground hover:bg-primary/40 hover:text-foreground',
        isCompleted &&
          'text-muted-foreground line-through hover:text-[#186343]',
        isCompleted && isActive && 'bg-alternate/20',
      )}
    >
      <div className="flex px-1 py-2 text-sm">{label}</div>
      <div
        className={cn(
          'ml-auto h-full border-2 border-primary opacity-0 transition-all',
          isActive && 'opacity-100',
          isCompleted && 'border-[#186343]',
        )}
      />
    </button>
  );
};
