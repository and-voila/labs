'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Course } from '@prisma/client';
import axios from 'axios';
import { ControllerRenderProps, useForm } from 'react-hook-form';
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

interface DescriptionFormProps {
  initialData: Course;
  courseId: string;
}

type FormValues = {
  description: string;
};

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

export const DescriptionForm = ({
  initialData,
  courseId,
}: DescriptionFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = useCallback(() => {
    setIsEditing((current) => !current);
  }, []);

  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onSubmit',
    defaultValues: {
      description: initialData?.description || '',
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast({
        title: 'Playbook description updated',
        description:
          'Awesome, we just saved your updated description for the Playbook.',
        variant: 'success',
      });
      toggleEdit();
      router.refresh();
    } catch {
      toast({
        title: 'Unable to update Playbook description',
        description:
          'Sorry, but something went wrong. Please try saving the playbook description again.',
        variant: 'destructive',
      });
    }
  };

  const renderField = useCallback(
    ({ field }: { field: ControllerRenderProps<FormValues> }) => (
      <FormItem>
        <FormControl>
          <QuillEditor {...field} />
        </FormControl>
        <FormDescription className="text-muted-foreground/70">
          The playbook description should be at least 150 words.
        </FormDescription>
        <FormMessage />
      </FormItem>
    ),
    [],
  );

  return (
    <div className="mt-6 rounded-md border bg-card px-4 py-6">
      <div className="mb-4 flex items-center justify-between font-semibold">
        Playbook description
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
            'mt-2 text-base text-muted-foreground',
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
              render={renderField}
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
