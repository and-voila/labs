import { ElementType, ReactNode } from 'react';
import { clsx } from 'clsx';

const commonClasses = 'font-bold lg:leading-tight';

interface TypographyProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

export function H1({ children, className = '', as = 'h1' }: TypographyProps) {
  const Tag = as;
  return (
    <Tag className={clsx(commonClasses, className, 'text-6xl lg:text-7xl')}>
      {children}
    </Tag>
  );
}

export function H2({ children, className = '', as = 'h2' }: TypographyProps) {
  const Tag = as;
  return (
    <Tag className={clsx(commonClasses, className, 'text-5xl lg:text-6xl')}>
      {children}
    </Tag>
  );
}

export function H3({ children, className = '', as = 'h3' }: TypographyProps) {
  const Tag = as;
  return (
    <Tag className={clsx(commonClasses, className, 'text-4xl lg:text-5xl')}>
      {children}
    </Tag>
  );
}

export function H4({ children, className = '', as = 'h4' }: TypographyProps) {
  const Tag = as;
  return (
    <Tag className={clsx(commonClasses, className, 'text-2xl sm:text-3xl')}>
      {children}
    </Tag>
  );
}

export function H5({ children, className = '', as = 'h5' }: TypographyProps) {
  const Tag = as;
  return (
    <Tag className={clsx(commonClasses, className, 'text-xl sm:text-2xl')}>
      {children}
    </Tag>
  );
}

export function H6({ children, className = '', as = 'h6' }: TypographyProps) {
  const Tag = as;
  return (
    <Tag className={clsx(commonClasses, className, 'text-lg lg:text-xl')}>
      {children}
    </Tag>
  );
}
