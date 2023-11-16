import { createUploadthing, type FileRouter } from 'uploadthing/next';

import { getSession } from '@/app/lib/session';
import { isTeacher } from '@/app/lib/teacher';

const f = createUploadthing();

const handleAuth = async () => {
  const session = await getSession();

  if (!session || !isTeacher(session.user.id)) {
    throw new Error('Unauthorized');
  }

  return { userId: session.user.id };
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
