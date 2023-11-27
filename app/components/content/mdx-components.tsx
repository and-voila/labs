import * as React from 'react';
import NextImage, { ImageProps } from 'next/image';
import { useMDXComponent } from 'next-contentlayer/hooks';

import { MdxCard } from '@/app/components/content/mdx-card';
import { Callout } from '@/app/components/shared/callout';
import { cn } from '@/app/lib/utils';

type MDXComponentProps = React.HTMLAttributes<HTMLElement> & {
  className?: string | null;
};

const components = {
  h1: ({ className, ...props }: MDXComponentProps) => (
    <h1
      className={cn(
        'mt-2 scroll-m-20 text-4xl font-bold tracking-tight',
        className,
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: MDXComponentProps) => (
    <h2
      className={cn(
        'mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0',
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: MDXComponentProps) => (
    <h3
      className={cn(
        'mt-8 scroll-m-20 text-2xl font-semibold tracking-tight',
        className,
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: MDXComponentProps) => (
    <h4
      className={cn(
        'mt-8 scroll-m-20 text-xl font-semibold tracking-tight',
        className,
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }: MDXComponentProps) => (
    <h5
      className={cn(
        'mt-8 scroll-m-20 text-lg font-semibold tracking-tight',
        className,
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }: MDXComponentProps) => (
    <h6
      className={cn(
        'mt-8 scroll-m-20 text-base font-semibold tracking-tight',
        className,
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }: MDXComponentProps) => (
    <a
      className={cn(
        'font-semibold text-primary underline underline-offset-4 lg:text-lg',
        className,
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: MDXComponentProps) => (
    <p
      className={cn(
        'leading-7 text-muted-foreground lg:text-lg [&:not(:first-child)]:mt-6',
        className,
      )}
      {...props}
    />
  ),
  ul: ({ className, ...props }: MDXComponentProps) => (
    <ul
      className={cn(
        'list my-6 ml-6 list-disc text-muted-foreground lg:text-lg',
        className,
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }: MDXComponentProps) => (
    <ol
      className={cn(
        'my-6 ml-6 list-decimal text-muted-foreground lg:text-lg',
        className,
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }: MDXComponentProps) => (
    <li className={cn('mt-2', className)} {...props} />
  ),
  blockquote: ({ className, ...props }: MDXComponentProps) => (
    <blockquote
      className={cn(
        'mt-6 border-l-4 border-l-primary py-6 pl-6 italic lg:text-lg [&>*]:text-muted-foreground',
        className,
      )}
      {...props}
    />
  ),
  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn('rounded-md border', className)} alt={alt} {...props} />
  ),
  hr: ({ ...props }) => <hr className="my-4 md:my-8" {...props} />,
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn('w-full', className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn('m-0 border-t p-0 even:bg-muted', className)}
      {...props}
    />
  ),
  th: ({ className, ...props }: MDXComponentProps) => (
    <th
      className={cn(
        'border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: MDXComponentProps) => (
    <td
      className={cn(
        'border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
        className,
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: MDXComponentProps) => (
    <pre
      className={cn(
        'mb-4 mt-6 overflow-x-auto rounded-lg border bg-black p-4',
        className,
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }: MDXComponentProps) => (
    <code
      className={cn(
        'relative rounded border px-[0.3rem] py-[0.2rem] font-mono text-sm md:text-base',
        className,
      )}
      {...props}
    />
  ),
  Image: (props: ImageProps) => <NextImage {...props} />,
  Callout,
  Card: MdxCard,
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <div className="mdx">
      <Component components={components} />
    </div>
  );
}
