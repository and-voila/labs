'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Chapter } from '@prisma/client';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { cn } from '#/lib/utils';

import { QuillEditor } from '#/components/learn/teacher/courses/quill-editor';
import { QuillPreview } from '#/components/learn/teacher/courses/quill-preview';
import { Icons } from '#/components/shared/icons';
import { Button } from '#/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '#/components/ui/form';
import { toast } from '#/components/ui/use-toast';

interface ChapterDescriptionFormProps {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  description: z.string().refine(
    (value) => {
      const wordCount = value.split(/\s+/).length;
      return wordCount >= 150;
    },
    {
      message: 'Description must be at least 150 words',
    },
  ),
});

export const ChapterDescriptionForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterDescriptionFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData?.description || '',
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values,
      );
      toast({
        title: 'Play description updated',
        description: 'Your play now has a fancy description people can ignore.',
        variant: 'success',
      });
      toggleEdit();
      router.refresh();
    } catch {
      toast({
        title: 'Could not update Play description',
        description:
          "Sorry about that, but for some reason we couldn't update the description for the Play. Please try again.",
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="mt-6 rounded-md border bg-card px-4 py-6">
      <div className="mb-4 flex items-center justify-between font-semibold">
        Describe the play
        <Button onClick={toggleEdit} variant="ghost" size="sm">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Icons.pencil className="mr-2 h-4 w-4 text-primary" />
              Edit description
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div
          className={cn(
            'mt-2 text-base',
            !initialData.description && 'italic text-destructive',
          )}
        >
          {!initialData.description && 'No description set'}
          {initialData.description && (
            <QuillPreview value={initialData.description} />
          )}
        </div>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-4"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <QuillEditor {...field} />
                  </FormControl>
                  <FormDescription className="text-muted-foreground/70">
                    The description should be at least 250 words. Make it
                    awesome!
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-end gap-x-2">
              <Button
                size="sm"
                variant="default"
                disabled={!isValid || isSubmitting}
                type="submit"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
