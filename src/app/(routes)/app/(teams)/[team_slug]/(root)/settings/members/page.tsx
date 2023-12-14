import { redirect } from 'next/navigation';
import { MembershipRole } from '@prisma/client';

import { authOptions } from '#/lib/auth';
import { getSession } from '#/lib/session';
import { getTeamInvites } from '#/lib/team/get-team-invites';
import { getTeamMembers } from '#/lib/team/get-team-members';
import { hasTeamAuthority } from '#/lib/team/team-authority';

import { Separator } from '#/components/ui/separator';
import { SubPageHeader } from '#/components/ui/subpage-header';

import { MemberList } from './components/member-list/member-list';
import { MembershipActions } from './components/member-ship-actions';

interface Props {
  params: {
    team_slug: string;
  };
}

const MembersPage: React.FC<Props> = async ({ params }) => {
  const session = await getSession();
  if (!session) {
    redirect(authOptions?.pages?.signIn || '/login');
  }

  const [members, invites, hasAuthority] = await Promise.all([
    getTeamMembers(params.team_slug),
    getTeamInvites(params.team_slug),
    hasTeamAuthority(session.user.id, params.team_slug),
  ]);

  return (
    <div className="flex flex-col gap-8">
      <SubPageHeader
        title="Members"
        description="Teammates that have access to this team."
      >
        <MembershipActions
          teamSlug={params.team_slug}
          isAdminOrOwner={hasAuthority}
          role={
            members?.find((member) => member.userId === session.user.id)
              ?.role ?? MembershipRole.MEMBER
          }
        />
      </SubPageHeader>
      <Separator />
      <MemberList
        currentUserId={session.user.id}
        hasAuthority={hasAuthority}
        invites={invites}
        members={members}
        teamSlug={params.team_slug}
      />
    </div>
  );
};

export default MembersPage;
