import { env } from 'env';

export const isAdmin = (userId?: string | null) => {
  const adminIds = env.NEXT_PUBLIC_ADMIN_ID.split(',');

  return userId ? adminIds.includes(userId) : false;
};
