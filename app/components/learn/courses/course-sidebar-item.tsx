'use client';

import { usePathname, useRouter } from 'next/navigation';

import { Icons } from '@/app/components/shared/icons';
import { CourseSidebarItemProps } from '@/app/lib/types';
import { cn } from '@/app/lib/utils';

export const CourseSidebarItem = ({
  label,
  id,
  isCompleted,
  courseId,
  isLocked,
}: CourseSidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const Icon = isLocked
    ? Icons.locked
    : isCompleted
    ? Icons.circleChecked
    : Icons.play;
  const isActive = pathname?.includes(id);

  const onClick = () => {
    router.push(`/learn/courses/${courseId}/chapters/${id}`);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        'flex items-center gap-x-2 pl-6 text-left text-sm font-semibold text-muted-foreground transition-all hover:bg-gray-400/20 hover:text-foreground',
        isActive &&
          'bg-brand/20 text-foreground hover:bg-brand/40 hover:text-foreground',
        isCompleted &&
          'text-muted-foreground line-through hover:text-[#186343]',
        isCompleted && isActive && 'bg-alternate/20',
      )}
    >
      <div className="flex items-center gap-x-2 py-4 text-base">
        <Icon
          className={cn(
            'h-4 w-4 text-muted-foreground',
            isActive && 'text-brand',
            isCompleted && 'text-[#186343]',
          )}
        />
        {label}
      </div>
      <div
        className={cn(
          'ml-auto h-full border-2 border-brand opacity-0 transition-all',
          isActive && 'opacity-100',
          isCompleted && 'border-[#186343]',
        )}
      />
    </button>
  );
};
