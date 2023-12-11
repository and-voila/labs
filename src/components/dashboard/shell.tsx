import { HTMLAttributes, ReactNode } from 'react';

import { cn } from '#/lib/utils';

interface DashboardShellProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export function DashboardShell({
  children,
  className,
  ...props
}: DashboardShellProps) {
  return (
    <div className={cn('grid items-start gap-8 px-2', className)} {...props}>
      {children}
    </div>
  );
}
