'use client';

import { usePathname, useRouter } from 'next/navigation';

import { CP_PREFIX } from '#/lib/const';
import { CourseSidebarItemProps } from '#/lib/types';
import { cn } from '#/lib/utils';

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
    router.push(`${CP_PREFIX}/learn/courses/${courseId}/chapters/${id}`);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        'flex text-left text-xs text-muted-foreground transition-all hover:bg-foreground/20 hover:text-foreground',
        isActive &&
          'bg-primary/20 font-medium text-foreground hover:bg-foreground/20 hover:text-foreground',
        isCompleted && 'line-through',
        isCompleted &&
          isActive &&
          'bg-foreground/20 text-foreground line-through',
      )}
    >
      <div className="flex px-1 py-1">{label}</div>
      <div
        className={cn(
          'ml-auto h-full border-2 border-primary opacity-0 transition-all',
          isActive && 'opacity-100',
          isCompleted && 'border-alternate',
        )}
      />
    </button>
  );
};
