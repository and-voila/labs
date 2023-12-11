import clsx from 'clsx';
import { ElementType, ReactNode } from 'react';

interface ContainerProps {
  as?: ElementType;
  className?: string;
  children?: ReactNode;
}

export function Container({
  as: Component = 'div',
  className,
  children,
}: ContainerProps) {
  return (
    <Component
      className={clsx('mx-auto max-w-5xl px-6 lg:px-8 xl:px-10', className)}
    >
      <div className="mx-auto max-w-2xl lg:max-w-none">{children}</div>
    </Component>
  );
}
