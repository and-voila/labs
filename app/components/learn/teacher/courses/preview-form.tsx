'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Course } from '@prisma/client';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Icons } from '@/app/components/shared/icons';
import { Button } from '@/app/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/app/components/ui/form';
import { Textarea } from '@/app/components/ui/textarea';
import { toast } from '@/app/components/ui/use-toast';
import { cn } from '@/app/lib/utils';

interface PreviewFormProps {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  preview: z
    .string()
    .min(125, {
      message: 'You need to provide a preview of at least 125 characters.',
    })
    .max(165, {
      message: 'Preview text cannot exceed 165 characters.',
    }),
});

export const PreviewForm = ({ initialData, courseId }: PreviewFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      preview: initialData?.preview || '',
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast({
        title: 'Cool, Playbook preview text updated',
        description:
          'Sweet! You just updated the preview text for the Playbook. Now learners can skim through it before they ignore it.',
        variant: 'success',
      });
      toggleEdit();
      router.refresh();
    } catch {
      toast({
        title: 'Unable to save preview text',
        description: 'Please try saving or setting the playbook preview again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="mt-6 rounded-md border bg-white px-4 py-6 dark:bg-background">
      <div className="mb-4 flex items-center justify-between font-semibold">
        Playbook preview text
        <Button onClick={toggleEdit} variant="ghost" size="sm">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Icons.pencil className="mr-2 h-4 w-4 text-brand" />
              Edit preview
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            'mt-2 text-base text-muted-foreground',
            !initialData.preview && 'italic text-destructive',
          )}
        >
          {initialData.preview || 'No preview set'}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-4"
          >
            <FormField
              control={form.control}
              name="preview"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="e.g. 'This is my super duper 158 character max playbook preview text...'"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-muted-foreground/70">
                    Your preview text should be SEO optimized and between
                    125-165 characters.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button
                size="sm"
                variant="custom"
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
