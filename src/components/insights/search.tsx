'use client';

import * as React from 'react';

import { cn } from '#/lib/utils';

import { Input } from '#/components/ui/input';
import { toast } from '#/components/ui/use-toast';

interface InsightsSearchProps extends React.HTMLAttributes<HTMLFormElement> {}

export function InsightsSearch({ className, ...props }: InsightsSearchProps) {
  function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    return toast({
      title: 'Not implemented',
      description:
        "We're still working on finishing things up including Search. Thank you for your patience. Please try again later.",
      variant: 'destructive',
    });
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn('relative w-full', className)}
      {...props}
    >
      <Input
        type="search"
        placeholder="Search our insights..."
        className="h-8 w-full bg-secondary sm:w-64 sm:pr-12"
      />
      <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 sm:flex">
        <span className="text-xs">⌘</span>K
      </kbd>
    </form>
  );
}
