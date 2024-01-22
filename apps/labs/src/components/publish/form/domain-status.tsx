'use client';

import { useDomainStatus } from '#/components/publish/form/use-domain-status';
import { Icons } from '#/components/shared/icons';

export default function DomainStatus({ domain }: { domain: string }) {
  const { status, loading } = useDomainStatus({ domain });

  return loading ? (
    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
  ) : status === 'Valid Configuration' ? (
    <Icons.circleChecked className="mr-2 h-6 w-6 text-alternate" />
  ) : status === 'Pending Verification' ? (
    <Icons.warning className="mr-2 h-6 w-6 text-yellow-600" />
  ) : (
    <Icons.crossCircled className="mr-2 h-6 w-6 text-destructive" />
  );
}
