'use client';

import type { ReactNode } from 'react';

import { useCallback } from 'react';

import { Button } from '@and-voila/ui/button';

import { useModal } from '#/components/publish/modal/provider';

export default function CreateSiteButton({
  children,
}: {
  children: ReactNode;
}) {
  const modal = useModal();

  const handleClick = useCallback(() => {
    if (modal) {
      modal.show(children);
    }
  }, [modal, children]);

  return (
    <Button
      size="sm"
      onClick={handleClick}
      variant="default"
      className="mt-6 w-full md:mt-0 md:w-auto"
    >
      New site
    </Button>
  );
}
