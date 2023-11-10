'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { COURSE_DEFAULT_PRICE } from '@/constants';
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
} from '@/app/components/ui/form';
import { Switch } from '@/app/components/ui/switch';
import { toast } from '@/app/components/ui/use-toast';

interface PriceFormProps {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  isFree: z.boolean(),
});

export const PriceForm = ({ initialData, courseId }: PriceFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isFree: initialData?.price === 0,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const price = values.isFree ? 0 : COURSE_DEFAULT_PRICE;

      await axios.patch(`/api/courses/${courseId}`, {
        price,
      });
      toast({
        title: 'Chaching!',
        description: 'You just updated the access settings for the playbook.',
      });
      toggleEdit();
      router.refresh();
    } catch {
      toast({
        title: "Oh no, that didn't work.",
        description: 'Something went wrong, so please try again. Thanks!',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="mt-6 rounded-md border bg-white px-4 py-6 dark:bg-background">
      <div className="mb-4 flex items-center justify-between font-semibold">
        Playbook access
        <Button
          onClick={toggleEdit}
          variant="ghost"
          aria-label="Edit access"
          size="sm"
        >
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Icons.pencil className="mr-2 h-4 w-4 text-brand" />
              Edit access
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className="mt-2 text-base text-muted-foreground">
          {initialData.price === 0 ? 'Free' : 'Paid'}
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
              name="isFree"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      role="switch"
                      aria-checked={field.value}
                      aria-label="Toggle playbook free status"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormDescription id="switch-label" className="text-base">
                      {field.value
                        ? 'This is a free playbook.'
                        : 'The is a paid playbook.'}
                    </FormDescription>
                  </div>
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
