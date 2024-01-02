'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { FieldValues, useForm } from 'react-hook-form';
import * as z from 'zod';

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

interface TitleFormProps {
  initialData: {
    title: string;
  };
  courseId: string;
}

const formSchema = z.object({
  title: z
    .string()
    .min(40, {
      message: 'Yo! The playbook title needs at least 40 characters.',
    })
    .max(65, {
      message: 'Hey verbosa, keep your title under 65 characters please.',
    }),
});

export const TitleForm = ({ initialData, courseId }: TitleFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = useCallback(() => {
    setIsEditing((current) => !current);
  }, []);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast({
        title: 'Playbook title updated',
        description: "Your playbook's title was updated. Anything else?",
        variant: 'success',
      });
      toggleEdit();
      router.refresh();
    } catch {
      toast({
        title: 'Yikes, couldn’t update playbook title',
        description: 'Please try updating the playbook title again. Thank you.',
        variant: 'destructive',
      });
    }
  };

  const renderField = useCallback(
    ({ field }: { field: FieldValues }) => (
      <FormItem>
        <FormControl>
          <Input
            disabled={isSubmitting}
            placeholder="e.g. 'The art of procrastination'"
            {...field}
          />
        </FormControl>
        <FormDescription className="text-muted-foreground/70">
          Use sentence case for your title between 45-65 characters.
        </FormDescription>
        <FormMessage />
      </FormItem>
    ),
    [isSubmitting],
  );

  return (
    <div className="rounded-md border bg-card px-4 py-6">
      <div className="mb-4 flex items-center justify-between font-semibold">
        Playbook title
        <Button onClick={toggleEdit} variant="ghost" size="sm">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Icons.pencil className="mr-2 h-4 w-4 text-primary" />
              Edit title
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className="mt-2 text-base text-muted-foreground">
          {initialData.title}
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
              name="title"
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
