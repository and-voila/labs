import * as React from 'react';

import { cn } from '@/app/lib/utils';

interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {}

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
