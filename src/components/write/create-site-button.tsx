'use client';

import { ReactNode } from 'react';

import { Button } from '#/components/ui/button';
import { useModal } from '#/components/write/modal/provider';

export default function CreateSiteButton({
  children,
}: {
  children: ReactNode;
}) {
  const modal = useModal();

  return (
    <Button onClick={() => modal?.show(children)} variant="default" size="sm">
      New site
    </Button>
  );
}
