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
import { Combobox } from '@/app/components/ui/combobox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/app/components/ui/form';
import { toast } from '@/app/components/ui/use-toast';
import { cn } from '@/app/lib/utils';

interface CategoryFormProps {
  initialData: Course;
  courseId: string;
  options: { label: string; value: string }[];
}

const formSchema = z.object({
  categoryId: z.string().min(2),
});

export const CategoryForm = ({
  initialData,
  courseId,
  options,
}: CategoryFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: initialData?.categoryId || '',
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast({
        title: 'Cool, category updated',
        description:
          "The playbook's category was successfully updated and set.",
        variant: 'success',
      });
      toggleEdit();
      router.refresh();
    } catch {
      toast({
        title: "Oops, couldn't update category",
        description: 'Please try setting the category again, sorry!',
        variant: 'destructive',
      });
    }
  };

  const selectedOption = options.find(
    (option) => option.value === initialData.categoryId,
  );

  return (
    <div className="mt-6 rounded-md border bg-card px-4 py-6">
      <div className="mb-4 flex items-center justify-between font-semibold">
        Playbook category
        <Button onClick={toggleEdit} variant="ghost" size="sm">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Icons.pencil className="mr-2 h-4 w-4 text-brand" />
              Edit category
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            'mt-2 text-base text-muted-foreground',
            !initialData.categoryId && 'italic text-destructive',
          )}
        >
          {selectedOption?.label || 'No category set'}
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
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Combobox
                      options={options}
                      {...field}
                      onChange={(value) => field.onChange(value)}
                    />
                  </FormControl>
                  <FormDescription className="text-muted-foreground/70">
                    Each playbook must have a category, only one.
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
