'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Chapter, Course } from '@prisma/client';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { cn } from '#/lib/utils';
import { ChaptersList } from '#/components/learn/teacher/courses/chapters-list';
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
import { Input } from '#/components/ui/input';
import { toast } from '#/components/ui/use-toast';

interface ChaptersFormProps {
  initialData: Course & { chapters: Chapter[] };
  courseId: string;
}

const formSchema = z.object({
  title: z
    .string()
    .min(40, {
      message: "Ugh, the play's title must be at least 40 characters",
    })
    .max(65, {
      message: "Oof, the play's title can't be more than 65 characters",
    }),
});

export const ChaptersForm = ({ initialData, courseId }: ChaptersFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const toggleCreating = () => {
    setIsCreating((current) => !current);
  };

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/chapters`, values);
      toast({
        title: 'Play created successfully',
        description:
          "Your play was just created and added to the playbook, it's almost official.",
        variant: 'success',
      });
      toggleCreating();
      router.refresh();
    } catch {
      toast({
        title: 'Unable to create Play',
        description:
          'An unexpected error occured. Please try doing what you just did again but not the same way you did it.',
        variant: 'destructive',
      });
    }
  };

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);

      await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
        list: updateData,
      });
      toast({
        title: 'The order of Plays has been updated',
        description:
          "You're a dragger and a dropper. Nice work. You just Marie Kondo'd your Plays like a boss.",
        variant: 'success',
      });
      router.refresh();
    } catch {
      toast({
        title: 'Unable to change Play order',
        description:
          'Please check your dragging or your dropping and drag and drop again. Sorry...',
        variant: 'destructive',
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (id: string) => {
    router.push(`/admin/teacher/courses/${courseId}/chapters/${id}`);
  };

  return (
    <div className="relative mt-6 rounded-md border bg-card px-4 py-6">
      {isUpdating && (
        <div className="rounded-m absolute right-0 top-0 flex h-full w-full items-center justify-center bg-slate-500/20">
          <Icons.spinner className="h-4 w-4 animate-spin text-muted-foreground" />
        </div>
      )}
      <div className="mb-4 flex items-center justify-between font-semibold">
        List of plays
        <Button onClick={toggleCreating} variant="ghost" size="sm">
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <Icons.pencil className="mr-2 h-4 w-4 text-primary" />
              Add a play
            </>
          )}
        </Button>
      </div>
      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Introduction to the playbook'"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-muted-foreground/70">
                    A playbook needs at least one play yo!
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              size="sm"
              variant="default"
              disabled={!isValid || isSubmitting}
              type="submit"
            >
              Create
            </Button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div
          className={cn(
            'mt-2 text-base text-muted-foreground ',
            !initialData.chapters.length && 'italic text-destructive',
          )}
        >
          {!initialData.chapters.length && 'No plays created'}
          <ChaptersList
            onEdit={onEdit}
            onReorder={onReorder}
            items={initialData.chapters || []}
          />
        </div>
      )}
      {!isCreating && (
        <p className="mt-4 text-sm text-muted-foreground">
          Drag and drop to reorder the chapters
        </p>
      )}
    </div>
  );
};
