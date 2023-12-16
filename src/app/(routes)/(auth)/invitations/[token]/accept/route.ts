import { notFound, redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

import { APP_BP } from '#/lib/const';
import { getSession } from '#/lib/session';
import { acceptInvitationByToken } from '#/lib/team/members/accept-invitation';
import { getInvitationByToken } from '#/lib/team/members/get-invitation';

export const GET = async (
  request: NextRequest,
  { params }: { params: { token: string } },
) => {
  const token = params.token;
  const urlParams = token ? `?token=${token}` : '';

  const [session, invitation] = await Promise.all([
    getSession(),
    getInvitationByToken(params.token),
  ]);

  if (!session) {
    redirect(`/register${urlParams}`);
  }

  if (!invitation) {
    notFound();
  }

  // on mismatch we redirect back to the invitation page, as we are dealing
  // the error handling there
  if (session.user.email !== invitation.email) {
    redirect(`/invitations/${params.token}`);
  }

  // let's accept the invitation and redirect to the team page
  try {
    await acceptInvitationByToken(session.user.id, params.token);
  } catch {
    redirect(`/invitations/${params.token}`);
  }

  redirect(`${APP_BP}/${invitation.teamSlug}/workspace/home`);
};
