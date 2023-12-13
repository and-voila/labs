import React from 'react';
import { MembershipRole } from '@prisma/client';

import { cn } from '#/lib/utils';

import { Badge } from '#/components/ui/badge';

interface RoleBadgeProps {
  isPersonal: boolean;
  role: MembershipRole;
}

export const RoleBadge: React.FC<RoleBadgeProps> = ({ isPersonal, role }) => {
  const baseClass = 'pointer-events-none border bg-transparent px-1 text-xs';
  let badgeText = '';

  const badgeClass = cn(baseClass, {
    'border-primary/80 text-primary/80': isPersonal,
    'border-alternate/80 text-alternate/80':
      !isPersonal && role === MembershipRole.OWNER,
    'border-muted-foreground/80 text-muted-foreground/80':
      !isPersonal && role === MembershipRole.MEMBER,
  });

  if (isPersonal) {
    badgeText = 'Personal';
  } else if (role === MembershipRole.OWNER) {
    badgeText = 'Owner';
  } else if (role === MembershipRole.MEMBER) {
    badgeText = 'Member';
  }

  return <Badge className={badgeClass}>{badgeText}</Badge>;
};
