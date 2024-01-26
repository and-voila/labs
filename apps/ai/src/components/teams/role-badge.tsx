import React from 'react';
import { MembershipRole } from '@prisma/client';

import { cn } from '@av/ui';
import { Badge } from '@av/ui/badge';

interface RoleBadgeProps {
  isPersonal: boolean;
  role: MembershipRole;
}

export const RoleBadge: React.FC<RoleBadgeProps> = ({ isPersonal, role }) => {
  const baseClass = 'pointer-events-none border bg-transparent px-1 text-xs';
  let badgeText = '';

  const badgeClass = cn(baseClass, {
    'border-primary text-primary': isPersonal,
    'border-alternate text-alternate':
      !isPersonal && role === MembershipRole.OWNER,
    'border-muted-foreground text-muted-foreground':
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
