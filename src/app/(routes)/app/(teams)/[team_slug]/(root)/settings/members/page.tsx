import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { MembershipRole } from '@prisma/client';

import { authOptions } from '#/lib/auth';
import { CP_PREFIX } from '#/lib/const';
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

  const baseUrl =
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001';

  const ogImageUrl = new URL(`${baseUrl}/api/og`);
  ogImageUrl.searchParams.set('title', title);

  const pageUrl = `${baseUrl}${CP_PREFIX}settings/workspaces`;

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
