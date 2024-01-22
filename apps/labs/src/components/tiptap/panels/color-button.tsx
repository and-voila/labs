import { memo, useCallback } from 'react';

import { cn } from '#/lib/utils';

export interface ColorButtonProps {
  color?: string;
  active?: boolean;
  onColorChange?: (color: string) => void;
}

export const ColorButton = memo(
  ({ color, active, onColorChange }: ColorButtonProps) => {
    const wrapperClassName = cn(
      'group flex items-center justify-center rounded px-1.5 py-1.5',
      !active && 'hover:bg-background',
      active && 'bg-background',
    );
    const bubbleClassName = cn(
      'h-4 w-4 rounded border bg-foreground shadow-sm ring-current ring-offset-2',
      !active && 'hover:ring-1',
      active && 'ring-1',
    );

    const handleClick = useCallback(() => {
      if (onColorChange) {
        onColorChange(color ?? '');
      }
    }, [onColorChange, color]);

    return (
      <button onClick={handleClick} className={wrapperClassName}>
        <div
          style={{ backgroundColor: color, color: color }}
          className={bubbleClassName}
        />
      </button>
    );
  },
);

ColorButton.displayName = 'ColorButton';
