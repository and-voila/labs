import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@av/ui';

interface DashboardShellProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export function DashboardShell({
  children,
  className,
  ...props
}: DashboardShellProps) {
  return (
    <div
      className={cn('my-6 grid items-start gap-8 md:my-10', className)}
      {...props}
    >
      {children}
    </div>
  );
}
