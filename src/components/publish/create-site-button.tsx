'use client';

import { ReactNode } from 'react';

import { useModal } from '#/components/publish/modal/provider';
import { Button } from '#/components/ui/button';

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
