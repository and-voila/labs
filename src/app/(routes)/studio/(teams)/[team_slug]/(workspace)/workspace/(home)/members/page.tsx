import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { MembershipRole } from '@prisma/client';

import { authOptions } from '#/lib/auth';
import { APP_BP, SITE_URL } from '#/lib/const';
import { getTeam } from '#/lib/operations/teams/get-current-team';
import { getTeamInvites } from '#/lib/operations/teams/get-team-invites';
import { getTeamMembers } from '#/lib/operations/teams/get-team-members';
import { hasTeamAuthority } from '#/lib/operations/teams/team-authority';
import { getSession } from '#/lib/operations/user/session';

import { SubPageHeader } from '#/components/dashboard/subpage-header';
import { MemberList } from '#/components/teams/member-list';
import { MembershipActions } from '#/components/teams/member-list-actions';
import { Separator } from '#/components/ui/separator';

interface Props {
  params: {
    team_slug: string;
  };
}

const MembersPage: React.FC<Props> = async ({ params }) => {
  const team = await getTeam(params.team_slug);
  if (!team || team.isPersonal) {
    redirect(`${APP_BP}/${params.team_slug}/workspace/home`);
  }

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
        title="Team members"
        description="Roll call! Bring in your squad, assign roles, and manage your team. Multiplayer's always better with friends."
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

export function generateMetadata(): Metadata {
  const title = 'Team Members';
  const description =
    "Manage your team members like a boss. Add, remove, or update their roles. Transfer ownership if that's your thing. It's all here";

  const ogImageUrl = new URL(`${SITE_URL}/api/og`);
  ogImageUrl.searchParams.set('title', title);

  const pageUrl = `${SITE_URL}${APP_BP}settings/workspaces`;

  const metadata = {
    title,
    description,
    openGraph: {
      type: 'website',
      title,
      description,
      images: [
        {
          url: ogImageUrl.toString(),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      url: pageUrl,
    },
    twitter: {
      title,
      description,
      images: [
        {
          url: ogImageUrl.toString(),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };

  return metadata;
}
