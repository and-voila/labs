'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Attachment, Course } from '@prisma/client';
import axios from 'axios';
import * as z from 'zod';

import { FileUpload } from '@/app/components/learn/teacher/file-upload';
import { Icons } from '@/app/components/shared/icons';
import { Button } from '@/app/components/ui/button';
import { toast } from '@/app/components/ui/use-toast';

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

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast({
        title: 'Kaboom, you did it!',
        description: 'Your attachment has been added to the playbook.',
      });
      toggleEdit();
      router.refresh();
    } catch {
      toast({
        title: 'Aww nuts, something broke.',
        description: 'Please try uploading the attachment again.',
        variant: 'destructive',
      });
    }
  };

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      toast({
        title: 'Look at you, power deleter!',
        description: 'Your attachment has been deleted from the playbook.',
      });
      router.refresh();
    } catch {
      toast({
        title: 'Uh oh, something broke.',
        description:
          'Please try again, this is one of those situations where we have no ideer what just happened.',
        variant: 'destructive',
      });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mt-6 rounded-md border bg-white px-4 py-6 dark:bg-background">
      <div className="mb-4 flex items-center justify-between font-semibold">
        Playbook attachments
        <Button onClick={toggleEdit} variant="ghost" size="sm">
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <Icons.plusCircled className="mr-2 h-4 w-4 text-brand" />
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
                  className="flex w-full items-center rounded-md border bg-white p-3 text-foreground dark:bg-background"
                >
                  <Icons.file className="mr-4 h-4 w-4 flex-shrink-0 text-brand" />
                  <p className="line-clamp-1 text-xs">{attachment.name}</p>
                  {deletingId === attachment.id && (
                    <div>
                      <Icons.spinner className="h-4 w-4 animate-spin" />
                    </div>
                  )}
                  {deletingId !== attachment.id && (
                    <button
                      onClick={() => onDelete(attachment.id)}
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
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <div className="mt-4 text-sm text-muted-foreground">
            Add cool stuff to reinforce the learning experience.
          </div>
        </div>
      )}
    </div>
  );
};
