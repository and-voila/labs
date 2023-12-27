'use client';

import { ReactNode, useCallback } from 'react';

import { useModal } from '#/components/publish/modal/provider';
import { Button } from '#/components/ui/button';

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
      onClick={handleClick}
      variant="default"
      className="mt-6 w-full md:mt-0 md:w-auto"
    >
      New site
    </Button>
  );
}
