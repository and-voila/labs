import * as React from 'react';

import { cn } from '@av/ui';
import { Icons } from '@av/ui/icons';

type EmptyPlaceholderProps = React.HTMLAttributes<HTMLDivElement>;

export function EmptyPlaceholder({
  className,
  children,
  ...props
}: EmptyPlaceholderProps) {
  return (
    <div
      className={cn(
        'flex min-h-[200px] flex-col items-center justify-center rounded-md border-2 border-dotted border-primary p-8 text-center animate-in fade-in-50',
        className,
      )}
      {...props}
    >
      <div className="mx-auto flex max-w-[400px] flex-col items-center justify-center text-center md:max-w-full">
        {children}
      </div>
    </div>
  );
}

interface EmptyPlaceholderIconProps
  extends Partial<React.SVGProps<SVGSVGElement>> {
  name: keyof typeof Icons;
  ref?:
    | ((instance: SVGSVGElement | null) => void)
    | React.RefObject<SVGSVGElement>
    | null;
}

EmptyPlaceholder.Icon = function EmptyPlaceHolderIcon({
  name,
  className,
  ...props
}: EmptyPlaceholderIconProps) {
  const Icon = Icons[name];

  if (!Icon) {
    return null;
  }

  return (
    <div className="flex h-16 w-16 items-center justify-center">
      <Icon className={cn('h-10 w-10 text-primary', className)} {...props} />
    </div>
  );
};

type EmptyPlacholderTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

EmptyPlaceholder.Title = function EmptyPlaceholderTitle({
  className,
  ...props
}: EmptyPlacholderTitleProps) {
  return (
    // TODO: Check if need to add children with default value
    // eslint-disable-next-line jsx-a11y/heading-has-content
    <h2 className={cn('mt-2 text-xl font-semibold', className)} {...props} />
  );
};

type EmptyPlaceholderDescriptionProps =
  React.HTMLAttributes<HTMLParagraphElement>;

EmptyPlaceholder.Description = function EmptyPlaceholderDescription({
  className,
  ...props
}: EmptyPlaceholderDescriptionProps) {
  return (
    <p
      className={cn(
        'mb-8 mt-2 text-center text-sm font-normal leading-6 text-muted-foreground',
        className,
      )}
      {...props}
    />
  );
};
