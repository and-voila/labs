import React, { useId } from 'react';

import { cn } from '@av/ui';

export interface LogomarkProps extends React.SVGProps<SVGSVGElement> {
  invert?: boolean;
  filled?: boolean;
  sidebar?: boolean;
}

export function Logomark({ invert, filled, sidebar, ...props }: LogomarkProps) {
  const id = useId();

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <rect
        clipPath={`url(#${id}-clip)`}
        className={cn(
          'h-8 transition-all duration-300',
          invert && !sidebar ? 'fill-gray-50' : 'fill-primary',
          filled ? 'w-8' : 'w-0 group-hover/logo:w-8',
        )}
      />
      <use
        href={`#${id}-path`}
        className={
          invert ? 'stroke-gray-50' : 'stroke-gray-950 dark:stroke-gray-50'
        }
        fill="none"
        strokeWidth="1"
      />
      <defs>
        <path
          id={`${id}-path`}
          d="M29 24.5c-.3-.5-.7-.9-1.2-1.2-.3-.2-.7-.3-1-.4h2c0-2.3.1-6.5.1-8.9 0-2.4 0-4.7.1-7h-5.8c0 2.3.1 4.7.1 7v2h-1.1v-2.6h-5.7V16c-1.7 0-3-.1-4-.4-1-.3-1.5-.8-1.5-1.5 0-.6.2-1 .7-1.3.5-.3 1.1-.5 2-.6.8-.1 1.7-.1 2.7 0 1 .1 2 .3 2.9.6V7.2c-1.7-.4-3.4-.6-5.1-.6-1.7 0-3.2.3-4.6.8-1.3.5-2.4 1.3-3.2 2.3-.8 1-1.2 2.3-1.2 3.8 0 1 .2 2 .6 2.8.4.9 1 1.6 1.9 2.3-1.1.7-1.8 1.5-2.4 2.5-.5 1-.8 2-.8 3.2 0 1.4.4 2.6 1.1 3.6.7 1 1.8 1.8 3.1 2.3 1.3.5 2.8.8 4.5.8 1.8 0 3.4-.3 4.7-.9 1.4-.6 2.4-1.5 3.2-2.6.8-1.1 1.2-2.5 1.2-4v-2.4h1.2v1.8h2c-.7.1-1.2.4-1.7.9-.7.7-1 1.4-1 2.3 0 .6.2 1.2.5 1.7s.7.9 1.2 1.2c.5.3 1.1.5 1.7.5.6 0 1.2-.2 1.7-.5s.9-.7 1.2-1.2c.3-.5.5-1.1.5-1.7-.1-.6-.3-1.1-.6-1.6zm-12.4-2.4v1c0 .9-.3 1.5-.9 2-.6.5-1.3.7-2.3.7-.9 0-1.6-.2-2.1-.7-.5-.4-.7-1-.7-1.7 0-1 .5-1.7 1.6-1.9 1.1-.3 2.5-.4 4.4-.4v1z"
        />
        <clipPath id={`${id}-clip`}>
          <use href={`#${id}-path`} />
        </clipPath>
      </defs>
    </svg>
  );
}

export interface LogoProps extends React.SVGProps<SVGSVGElement> {
  invert?: boolean;
  filled?: boolean;
  fillOnHover?: boolean;
  sidebar?: boolean;
}

export function Logo({
  className,
  invert = false,
  filled = false,
  fillOnHover = false,
  sidebar,
  ...props
}: LogoProps) {
  return (
    <svg
      viewBox="0 0 130 32"
      aria-hidden="true"
      className={cn(fillOnHover && 'group/logo', className)}
      {...props}
    >
      <Logomark
        preserveAspectRatio="xMinYMid meet"
        invert={invert}
        filled={filled}
        sidebar={sidebar}
      />
      <path
        className={cn(
          invert ? 'fill-gray-50' : 'fill-gray-950 dark:fill-gray-50',
        )}
        d="M52 7.6h-3c-.8 2.6-1.7 5.2-2.5 7.8-.8 2.6-1.7 5.3-2.5 7.8-.8-2.6-1.7-5.2-2.5-7.8-.8-2.6-1.7-5.3-2.5-7.8h-6c1.2 3.8 2.5 7.7 3.7 11.6 1.3 3.9 2.5 7.8 3.7 11.6h7.2c1.2-3.8 2.5-7.7 3.7-11.6 1.3-3.9 2.5-7.8 3.7-11.6h-3zm20.7 2.8c-1-1.1-2.3-1.9-3.6-2.5-1.5-.6-3-.9-4.7-.9-1.7 0-3.2.3-4.6.9-1.4.6-2.6 1.4-3.6 2.5s-1.8 2.4-2.4 3.8c-.6 1.5-.9 3.1-.9 4.8 0 1.8.3 3.4.9 4.9.6 1.5 1.4 2.8 2.4 3.9s2.2 1.9 3.6 2.5c1.4.6 2.9.9 4.6.9 1.7 0 3.2-.3 4.6-.9s2.6-1.4 3.6-2.5 1.8-2.4 2.4-3.9c.6-1.5.9-3.1.9-4.9 0-1.8-.3-3.4-.9-4.8-.5-1.4-1.3-2.7-2.3-3.8zm-3.6 12.2c-.4 1-1.1 1.8-1.9 2.3-.8.6-1.8.8-2.9.8-1.1 0-2-.3-2.8-.8-.8-.6-1.4-1.3-1.9-2.3-.4-1-.7-2.2-.7-3.5 0-1.3.2-2.5.7-3.5.4-1 1.1-1.8 1.9-2.3.8-.5 1.8-.8 2.8-.8 1.1 0 2.1.3 2.9.8.8.6 1.4 1.3 1.9 2.3.4 1 .7 2.1.7 3.4 0 1.4-.2 2.6-.7 3.6zm7.7-15v23.2h6V7.6h-6zM114 19.1c-1.2-3.9-2.4-7.8-3.6-11.6h-8.2c-1.2 3.8-2.4 7.7-3.6 11.6-.6 2.1-1.3 4.1-1.9 6.2h-7V7.5h-6v23.2H101c.2-.7.4-1.5.6-2.2.2-.7.4-1.5.6-2.2h7.8c.2.7.4 1.5.6 2.2.2.7.4 1.5.6 2.2h6c-.8-3.8-2-7.6-3.2-11.6zm-7.6 2.2H104c.4-1.3.8-2.7 1.2-4.1.4-1.4.8-2.7 1.2-4.1.4 1.3.8 2.7 1.2 4.1.4 1.4.8 2.7 1.2 4.1h-2.4z"
      />
    </svg>
  );
}
