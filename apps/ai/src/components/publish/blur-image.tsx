'use client';

import type { ComponentProps } from 'react';

import { useCallback, useState } from 'react';
import Image from 'next/image';

import { cn } from '@av/ui';

export default function BlurImage(props: ComponentProps<typeof Image>) {
  const [isLoading, setLoading] = useState(true);

  const handleLoad = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <Image
      {...props}
      alt={props.alt}
      className={cn(
        props.className,
        'duration-700 ease-in-out',
        isLoading ? 'blur-lg' : 'blur-0',
      )}
      onLoad={handleLoad}
    />
  );
}
