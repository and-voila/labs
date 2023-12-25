'use client';

import { MembershipRole } from '@prisma/client';

import { Icons } from '#/components/shared/icons';
import { Button } from '#/components/ui/button';

import { AddTeamMember } from './add-team-member';

export interface MembershipActionsProps {
  teamSlug: string;
  isAdminOrOwner: boolean;
  role: MembershipRole;
}

export const MembershipActions: React.FC<MembershipActionsProps> = (props) => {
  const { isAdminOrOwner, role, teamSlug } = props;

  return (
    <div className="flex gap-2">
      {role !== MembershipRole.OWNER && (
        <Button variant="outline">
          <Icons.doorOpen className="me-2 h-4 w-4" />
          Leave Team
        </Button>
      )}
      {isAdminOrOwner && <AddTeamMember teamSlug={teamSlug} />}
    </div>
  );
};