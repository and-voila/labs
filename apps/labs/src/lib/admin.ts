import { db } from './db';

export const isAdmin = async (userId?: string | null): Promise<boolean> => {
  if (!userId) return false;

  const admin = await db.admin.findUnique({
    where: { userId },
  });

  return !!admin;
};
