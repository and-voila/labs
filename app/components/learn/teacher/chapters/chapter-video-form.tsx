'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MuxPlayer from '@mux/mux-player-react';
import { Chapter, MuxData } from '@prisma/client';
import axios from 'axios';
import * as z from 'zod';

import { FileUpload } from '@/app/components/learn/teacher/file-upload';
import { Icons } from '@/app/components/shared/icons';
import { Button } from '@/app/components/ui/button';
import { toast } from '@/app/components/ui/use-toast';

interface ChapterVideoFormProps {
  initialData: Chapter & { muxData?: MuxData | null };
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

export const ChapterVideoForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterVideoFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values,
      );
      toast({
        title: 'Good stuff, grab the popcorn!',
        description: 'Your video has been uploaded to the Mux cloud.',
      });
      toggleEdit();
      router.refresh();
    } catch {
      toast({
        title: 'Crap! An error occurred.',
        description: 'Please try uploading or saving the video again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="mt-6 rounded-md border bg-white px-4 py-6 dark:bg-background">
      <div className="mb-4 flex items-center justify-between font-semibold">
        Video for the play
        <Button onClick={toggleEdit} variant="ghost" size="sm">
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.videoUrl && (
            <>
              <Icons.plusCircled className="mr-2 h-4 w-4 text-brand" />
              Add a video
            </>
          )}
          {!isEditing && initialData.videoUrl && (
            <>
              <Icons.pencil className="mr-2 h-4 w-4 text-brand" />
              Edit video
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.videoUrl ? (
          <div className="flex h-60 items-center justify-center rounded-md bg-muted">
            <Icons.youtube className="h-10 w-10 text-brand" />
          </div>
        ) : (
          <div className="relative mt-2 aspect-video">
            <MuxPlayer playbackId={initialData?.muxData?.playbackId || ''} />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          />
          <div className="mt-4 text-xs text-muted-foreground">
            Upload this play&apos;s video
          </div>
        </div>
      )}
      {initialData.videoUrl && !isEditing && (
        <div className="mt-2 text-xs text-muted-foreground">
          Videos can take a few minutes to process. Refresh the page if video
          does not appear.
        </div>
      )}
    </div>
  );
};
