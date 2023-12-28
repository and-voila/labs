import { forwardRef, HTMLProps } from 'react';

import { cn } from '#/lib/tiptap/utils';

export type SurfaceProps = HTMLProps<HTMLDivElement> & {
  withShadow?: boolean;
  withBorder?: boolean;
};

export const Surface = forwardRef<HTMLDivElement, SurfaceProps>(
  (
    { children, className, withShadow = true, withBorder = true, ...props },
    ref,
  ) => {
    const surfaceClass = cn(
      className,
      'rounded-lg bg-card',
      withShadow ? 'shadow-sm' : '',
      withBorder ? 'border' : '',
    );

    return (
      <div className={surfaceClass} {...props} ref={ref}>
        {children}
      </div>
    );
  },
);

Surface.displayName = 'Surface';
