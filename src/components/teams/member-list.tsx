import React from 'react';

import { GetTeamInvitesReturn } from '#/lib/operations/teams/get-team-invites';
import { GetTeamMemberResult } from '#/lib/operations/teams/get-team-members';

import { Badge } from '#/components/ui/badge';

import { InvitesActions } from './invites-actions';
import { MemberActions } from './member-actions';
import { RolePopover } from './role-popover';

export interface MemberListProps {
  currentUserId: string;
  invites: GetTeamInvitesReturn;
  members: GetTeamMemberResult;
  hasAuthority: boolean;
  teamSlug: string;
}

export const MemberList: React.FC<MemberListProps> = (props) => {
  const { invites, members, hasAuthority, currentUserId, teamSlug } = props;

  const currentMember = members?.find(
    (member) => member.userId === currentUserId,
  );

  return (
    <ul className="divide-y rounded-lg border">
      {invites?.map((invite) => (
        <li key={invite.id} className="px-5">
          <div className="my-4 flex justify-between">
            <div className="flex w-full flex-col justify-between truncate sm:flex-row">
              <div className="flex flex-col gap-1">
                <div className="flex">
                  <span className="text-sm font-semibold">
                    {invite.name ??
                      invite.email.split('@')[0] ??
                      'Unnamed User'}
                  </span>{' '}
                  <Badge variant="outline">Invited</Badge>
                </div>
                <div className="flex items-center text-foreground">
                  <span className="text-sm text-muted-foreground">
                    {invite.email}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-12">
              <span className="text-sm capitalize text-foreground">
                {invite.role.toLowerCase()}
              </span>
              <InvitesActions id={invite.id} isAdmin={hasAuthority} />
            </div>
          </div>
        </li>
      ))}
      {members?.map((member) => (
        <li key={member.id} className="px-5">
          <div className="my-4 flex justify-between">
            <div className="flex w-full flex-col justify-between truncate sm:flex-row">
              <div className="flex flex-col gap-1">
                <div className="flex">
                  <span className="text-sm font-semibold">
                    {member.user.name ??
                      member.user.email!.split('@')[0] ??
                      'Unnamed User'}
                  </span>
                </div>
                <div className="flex items-center text-foreground">
                  <span className="text-sm text-muted-foreground">
                    {member.user.email}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-12">
              <RolePopover
                isAdmin={currentMember?.role === 'ADMIN'}
                isOwner={currentMember?.role === 'OWNER'}
                teamSlug={teamSlug}
                memberId={member.id}
                role={member.role}
              />
              <MemberActions
                id={member.id}
                isAdmin={hasAuthority}
                isCurrentUser={currentUserId === member.userId}
              />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
