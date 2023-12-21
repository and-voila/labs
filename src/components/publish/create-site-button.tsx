'use client';

import { ReactNode } from 'react';

import { useModal } from '#/components/publish/modal/provider';
import { Icons } from '#/components/shared/icons';
import { Button } from '#/components/ui/button';

export default function CreateSiteButton({
  children,
}: {
  children: ReactNode;
}) {
  const modal = useModal();

  return (
    <Button
      onClick={() => modal?.show(children)}
      variant="default"
      size="lg"
      className="mt-6 w-full md:mt-0 md:w-auto"
    >
      <Icons.plusCircled className="mr-2 h-4 w-4" /> New site
    </Button>
  );
}
