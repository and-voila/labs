'use client';

import { Course } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as z from 'zod';

import { FileUpload } from '#/components/learn/teacher/file-upload';
import { Icons } from '#/components/shared/icons';
import { Button } from '#/components/ui/button';
import { toast } from '#/components/ui/use-toast';
import BlurImage from '#/components/write/blur-image';
import { placeholderBlurhash } from '#/lib/utils';

interface ImageFormProps {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: 'Image is required',
  }),
});

export const ImageForm = ({ initialData, courseId }: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast({
        title: 'Playbook image updated',
        description:
          'Wow, your Playbook has a fancy new featured image. Nice work! #cats',
        variant: 'success',
      });
      toggleEdit();
      router.refresh();
    } catch {
      toast({
        title: 'Could not update image',
        description:
          'Please try uploading the image again, or saving it again. Whichever will work this time. Thanks for your patience.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="mt-6 rounded-md border bg-card px-4 py-6">
      <div className="mb-4 flex items-center justify-between font-semibold">
        Playbook image
        <Button onClick={toggleEdit} variant="ghost" size="sm">
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.imageUrl && (
            <>
              <Icons.plusCircled className="mr-2 h-4 w-4 text-primary" />
              Add an image
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <>
              <Icons.pencil className="mr-2 h-4 w-4 text-primary" />
              Edit image
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.imageUrl ? (
          <div className="flex h-60 items-center justify-center rounded-md bg-muted">
            <Icons.image className="h-10 w-10 text-primary" />
          </div>
        ) : (
          <div className="relative mt-2 aspect-video">
            <BlurImage
              alt="Upload"
              fill
              className="rounded-md object-cover"
              src={initialData.imageUrl}
              placeholder="blur"
              blurDataURL={placeholderBlurhash}
              role="img"
            />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
          />
          <div className="mt-4 text-sm text-muted-foreground">
            Upload a 2400px x 1260px image.
          </div>
        </div>
      )}
    </div>
  );
};
