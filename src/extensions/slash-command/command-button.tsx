import { forwardRef } from 'react';
import { icons } from 'lucide-react';

import { cn } from '#/lib/utils';

import { Icon } from '#/components/tiptap/icon';

export type CommandButtonProps = {
  active?: boolean;
  description: string;
  icon: keyof typeof icons;
  onClick: () => void;
  title: string;
};

export const CommandButton = forwardRef<HTMLButtonElement, CommandButtonProps>(
  ({ active, icon, onClick, title }, ref) => {
    const wrapperClass = cn(
      'flex items-center justify-start gap-2 rounded p-1.5 text-xs font-semibold text-muted-foreground',
      !active && 'bg-transparent hover:bg-secondary hover:text-foreground',
      active && 'bg-secondary text-foreground hover:bg-secondary',
    );

    return (
      <button ref={ref} onClick={onClick} className={wrapperClass}>
        <Icon name={icon} className="h-3 w-3" />
        <div className="flex flex-col items-start justify-start">
          <div className="text-sm font-medium">{title}</div>
        </div>
      </button>
    );
  },
);

CommandButton.displayName = 'CommandButton';
