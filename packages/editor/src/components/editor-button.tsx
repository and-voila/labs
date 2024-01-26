import React from 'react';

import { cn } from '@av/ui';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'
  | 'ghost';
export type ButtonSize = 'medium' | 'small' | 'icon' | 'iconSmall';

export type ButtonProps = {
  variant?: ButtonVariant;
  active?: boolean;
  activeClassname?: string;
  buttonSize?: ButtonSize;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      active,
      buttonSize = 'medium',
      children,
      disabled,
      variant = 'primary',
      className,
      activeClassname,
      ...rest
    },
    ref,
  ) => {
    const buttonClassName = cn(
      'group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',

      variant === 'primary' &&
        cn(
          'neu bg-primary text-primary-foreground shadow hover:bg-primary/90',
          !disabled && !active && 'hover:bg-primary/90',
          active && cn('bg-primary/90', activeClassname),
        ),

      variant === 'secondary' &&
        cn(
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-primary/20',
          !disabled && !active && 'hover:bg-primary/20',
          active && 'hover:bg-primary/20',
        ),

      variant === 'tertiary' &&
        cn(
          'border border-input bg-transparent text-muted-foreground shadow-sm hover:bg-primary/20 hover:text-accent-foreground',
          !disabled && !active && 'hover:bg-secondary active:bg-secondary',
          active && cn('hover:bg-secondary', activeClassname),
        ),

      variant === 'ghost' &&
        cn(
          'text-muted-foreground hover:bg-secondary hover:text-foreground',
          !disabled && !active && 'hover:bg-secondary',
          active && cn('bg-secondary text-foreground', activeClassname),
        ),

      buttonSize === 'medium' && 'px-3 py-2',
      buttonSize === 'small' && 'px-2 py-1',
      buttonSize === 'icon' && 'h-8 w-8',
      buttonSize === 'iconSmall' && 'h-6 w-6',

      className,
    );

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={buttonClassName}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
