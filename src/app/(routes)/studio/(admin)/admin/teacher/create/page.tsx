'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { FieldValues, useForm } from 'react-hook-form';
import * as z from 'zod';

import { APP_BP, COURSE_DEFAULT_PRICE } from '#/lib/const';

import { DashboardHeader } from '#/components/dashboard/header';
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

const formSchema = z.object({
  title: z
    .string()
    .min(40, {
      message: 'Ouch! The playbook title must be at least 40 characters',
    })
    .max(65, {
      message: 'OK but, the playbook title cannot exceed 65 characters.',
    }),
});

const CreatePage = () => {
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
      const response = await axios.post('/api/courses', {
        ...values,
        price: COURSE_DEFAULT_PRICE,
      });

      router.push(`${APP_BP}/admin/teacher/courses/${response.data.id}`);
      toast({
        title: 'Playbook created',
        description:
          'Your playbook title is set and ready for you to make it awesome.',
        variant: 'success',
      });
    } catch {
      toast({
        title: 'Playbook not created.',
        description:
          "Something just broke, and we couldn't create your Playbook. It's probably Rebekah's fault. Please try again.",
        variant: 'destructive',
      });
    }
  };

  const renderInput = useCallback(
    ({ field }: { field: FieldValues }) => (
      <FormItem>
        <FormControl>
          <Input
            disabled={isSubmitting}
            placeholder="The art of procrastination"
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
    <div className="flex flex-col gap-8">
      <DashboardHeader
        title="Create new playbook"
        description="Making learning fun again."
      />
      <div className="my-8 grid max-w-3xl gap-8 md:my-12">
        <div className="rounded-md border bg-card px-4 py-6">
          <div className="mb-4 flex items-center justify-between font-semibold">
            Playbook title
          </div>
          <p className="text-sm text-muted-foreground lg:text-base">
            Choose a short and SEO friendly title for your playbook.
          </p>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-8 space-y-8"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={renderInput}
                />
                <div className="flex items-center justify-end gap-x-2">
                  <Link href={`${APP_BP}/admin/teacher/courses`}>
                    <Button type="button" variant="ghost" size="sm">
                      Cancel
                    </Button>
                  </Link>
                  <Button
                    variant="default"
                    type="submit"
                    size="sm"
                    disabled={!isValid || isSubmitting}
                  >
                    Continue
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
