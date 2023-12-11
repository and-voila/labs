import { db } from '#/lib/db';

export const getInvitationByToken = async (token: string) => {
  return db.teamInvitation.findUnique({
    where: {
      token,
    },
    include: {
      team: true,
      invitedBy: true,
    },
  });
};
