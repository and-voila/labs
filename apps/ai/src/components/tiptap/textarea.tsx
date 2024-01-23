import { forwardRef } from 'react';

import { cn } from '@and-voila/ui';

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...rest }, ref) => {
  const textAreaClassName = cn(
    'flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    className,
  );

  return <textarea className={textAreaClassName} ref={ref} {...rest} />;
});

Textarea.displayName = 'Textarea';
