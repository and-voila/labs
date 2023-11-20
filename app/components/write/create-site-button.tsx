'use client';

import { ReactNode } from 'react';

import { Button } from '@/app/components/ui/button';
import { useModal } from '@/app/components/write/modal/provider';

export default function CreateSiteButton({
  children,
}: {
  children: ReactNode;
}) {
  const modal = useModal();

  return (
    <Button onClick={() => modal?.show(children)} variant="custom" size="sm">
      New site
    </Button>
  );
}
