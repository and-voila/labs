import { env } from ':/env.mjs';

export const isTeacher = (userId?: string | null) => {
  const teacherIds = env.NEXT_PUBLIC_TEACHER_ID.split(',');

  return userId ? teacherIds.includes(userId) : false;
};
