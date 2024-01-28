import type { NewCollabPostFormValues } from '#/lib/validations/post';
import type { FieldValues } from 'react-hook-form';

import React, { useCallback, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@av/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@av/ui/form';
import { Icons } from '@av/ui/icons';
import { Input } from '@av/ui/input';
import { Textarea } from '@av/ui/textarea';
import { toast } from '@av/ui/use-toast';
import { APP_BP } from '@av/utils';

import { createCollabPost } from '#/lib/actions/publish/publish-actions';
import { newCollabPostFormSchema } from '#/lib/validations/post';

const defaultValues: NewCollabPostFormValues = {
  title: '',
  description: '',
};

interface NewCollabPostFormProps {
  siteId: string;
  teamSlug: string;
}

export const NewCollabPostForm: React.FC<NewCollabPostFormProps> = ({
  siteId,
  teamSlug,
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<NewCollabPostFormValues>({
    resolver: zodResolver(newCollabPostFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const { watch, formState } = form;
  const title = watch('title');

  const slugPreview = title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

  const onSubmit = (data: NewCollabPostFormValues) => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);

        const result = await createCollabPost(formData, siteId, teamSlug);
        if (result) {
          toast({
            title: 'New post created',
            description:
              "Your post is ready for editing. Let's bring those ideas to life. We'll send you there in just a sec...",
            variant: 'success',
          });
          router.push(
            `${APP_BP}/${teamSlug}/workspace/publish/post/${result.id}`,
          );
        }
      } catch (e) {
        toast({
          title: 'Oops, could not create post',
          description:
            'We hit a snag creating your post. Please try again or reach out for support. Thanks for your patience.',
          variant: 'destructive',
        });
      }
    });
  };

  const renderInput = useCallback(
    ({ field }: { field: FieldValues }) => (
      <FormItem>
        <FormLabel required>Your post title</FormLabel>
        <FormControl>
          <Input
            placeholder="My draft post title with a max of 58 characters for SEO"
            {...field}
          />
        </FormControl>
        <FormDescription className="my-2 text-xs text-muted-foreground">
          <span className="font-medium">your-subdomain.andvoila.gg</span>
          <span className="font-medium text-alternate">
            {slugPreview ? `/${slugPreview}` : '/...'}
          </span>
        </FormDescription>
        <FormMessage />
      </FormItem>
    ),
    [slugPreview],
  );

  const renderDescription = useCallback(
    ({ field }: { field: FieldValues }) => (
      <FormItem>
        <FormLabel required>Your post description</FormLabel>
        <FormControl>
          <Textarea
            placeholder="This is my awesome SEO optimized post description that sums up the context of what this post is about. I can change it at anytime and get an AI assist too."
            {...field}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    ),
    [],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField control={form.control} name="title" render={renderInput} />
        <FormField
          control={form.control}
          name="description"
          render={renderDescription}
        />
        <div className="flex justify-end">
          <Button
            size="sm"
            type="submit"
            isLoading={isPending}
            disabled={!formState.isValid || !formState.isDirty || isPending}
          >
            {isPending ? (
              <>
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              'Create'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
