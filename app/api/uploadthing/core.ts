import { createUploadthing, type FileRouter } from 'uploadthing/next';

import { getCurrentUser } from '@/app/lib/session';
import { isTeacher } from '@/app/lib/teacher';

const f = createUploadthing();

const handleAuth = async () => {
  const user = await getCurrentUser();
  const userId = user?.id;
  const isAuthorized = isTeacher(userId);

  if (!userId || !isAuthorized) throw new Error('Unauthorized');
  return { userId };
};

export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: '2MB', maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  courseAttachment: f(['text', 'image', 'video', 'audio', 'pdf'])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: '512GB' } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
