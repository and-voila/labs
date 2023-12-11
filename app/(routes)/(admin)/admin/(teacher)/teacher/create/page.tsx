'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { COURSE_DEFAULT_PRICE } from ':/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { DashboardShell } from '#/components/dashboard/shell';
import { Button } from '#/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
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

      router.push(`/admin/teacher/courses/${response.data.id}`);
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

  return (
    <DashboardShell>
      <div className="flex rounded-xl border bg-card p-6 shadow-md md:p-12">
        <div>
          <h1 className="mb-4 text-2xl sm:text-3xl">Name the playbook</h1>
          <p className="text-sm text-muted-foreground lg:text-base">
            Choose a short and SEO friendly title for your playbook.
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-8 space-y-8"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Playbook title</FormLabel>
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
                )}
              />
              <div className="flex items-center gap-x-2">
                <Link href="/admin/teacher/courses">
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
    </DashboardShell>
  );
};

export default CreatePage;
