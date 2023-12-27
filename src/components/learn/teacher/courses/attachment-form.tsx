'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Attachment, Course } from '@prisma/client';
import axios from 'axios';
import * as z from 'zod';

import { FileUpload } from '#/components/learn/teacher/file-upload';
import { Icons } from '#/components/shared/icons';
import { Button } from '#/components/ui/button';
import { toast } from '#/components/ui/use-toast';

interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
}

const formSchema = z.object({
  url: z.string().min(1),
});

export const AttachmentForm = ({
  initialData,
  courseId,
}: AttachmentFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const toggleEdit = useCallback(() => {
    setIsEditing((current) => !current);
  }, []);

  const router = useRouter();

  const onSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      try {
        await axios.post(`/api/courses/${courseId}/attachments`, values);
        toast({
          title: 'Attachment attached successfully',
          description:
            "Your attachment has been added to the playbook. You're attached!",
          variant: 'success',
        });
        toggleEdit();
        router.refresh();
      } catch {
        toast({
          title: 'Ugh, we have attachment issues',
          description:
            "Something went wrong and we couldn't attach your attachment. Please try again.",
          variant: 'destructive',
        });
      }
    },
    [courseId, router, toggleEdit],
  );

  const handleChange = useCallback(
    (url?: string) => {
      if (url) {
        onSubmit({ url: url });
      }
    },
    [onSubmit],
  );

  const onDelete = useCallback(
    async (id: string) => {
      try {
        setDeletingId(id);
        await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
        toast({
          title: 'Your attachment was deleted',
          description: 'You just removed the attachment from the playbook.',
          variant: 'success',
        });
        router.refresh();
      } catch {
        toast({
          title: 'Whoops, unable to remove attachment',
          description:
            'Please try removing the attachment again. Thanks for your patience.',
          variant: 'destructive',
        });
      } finally {
        setDeletingId(null);
      }
    },
    [courseId, router],
  );

  const handleDelete = useCallback(
    (id: string) => () => {
      onDelete(id);
    },
    [onDelete],
  );

  return (
    <div className="mt-6 rounded-md border bg-card px-4 py-6">
      <div className="mb-4 flex items-center justify-between font-semibold">
        Playbook attachments
        <Button onClick={toggleEdit} variant="ghost" size="sm">
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <Icons.plusCircled className="mr-2 h-4 w-4 text-primary" />
              Add a file
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData.attachments.length === 0 && (
            <p className="mt-2 text-base italic text-destructive">
              No attachments set
            </p>
          )}
          {initialData.attachments.length > 0 && (
            <div className="space-y-2">
              {initialData.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex w-full items-center rounded-md border bg-card p-3 text-foreground"
                >
                  <Icons.file className="mr-4 h-4 w-4 flex-shrink-0 text-primary" />
                  <p className="line-clamp-1 text-xs">{attachment.name}</p>
                  {deletingId === attachment.id && (
                    <div>
                      <Icons.spinner className=" ml-2 h-4 w-4 animate-spin" />
                    </div>
                  )}
                  {deletingId !== attachment.id && (
                    <button
                      onClick={handleDelete(attachment.id)}
                      className="ml-auto transition hover:opacity-75"
                    >
                      <Icons.crossLarge className="h-4 w-4 text-destructive" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {isEditing && (
        <div>
          <FileUpload endpoint="courseAttachment" onChange={handleChange} />
          <div className="mt-4 text-sm text-muted-foreground">
            Add cool stuff to reinforce the learning experience.
          </div>
        </div>
      )}
    </div>
  );
};
