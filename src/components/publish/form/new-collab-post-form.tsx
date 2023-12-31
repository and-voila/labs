import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm } from 'react-hook-form';

import { createCollabPost } from '#/lib/actions/publish/publish-actions';
import { APP_BP } from '#/lib/const';
import {
  newCollabPostFormSchema,
  NewCollabPostFormValues,
} from '#/lib/validations/new-post';

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
import { Textarea } from '#/components/ui/textarea';
import { toast } from '#/components/ui/use-toast';

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
  const [isSubmitting, setIsSubmitting] = React.useState(false);

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

  const onSubmit = async (data: NewCollabPostFormValues) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);

      const result = await createCollabPost(formData, siteId, teamSlug);
      if (result) {
        toast({
          title: 'New post created',
          description:
            "Your post is ready for editing. Let's bring those ideas to life. We'll send you there in jus a sec...",
          variant: 'success',
        });
        router.push(
          `${APP_BP}/${teamSlug}/workspace/publish/post/new/${result.id}`,
        );
      }
    } catch (e) {
      toast({
        title: 'Oops, could not create post',
        description:
          'We hit a snag creating your post. Please try again or reach out for support. Thanks for your patience.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderInput = useCallback(
    ({ field }: { field: FieldValues }) => (
      <FormItem>
        <FormLabel>Your post title</FormLabel>
        <FormControl>
          <Input
            placeholder="My draft post title with a max of 58 characters for SEO"
            {...field}
          />
        </FormControl>
        <FormDescription className="my-2 text-xs text-muted-foreground">
          <span className="font-medium">your-subdomain.andvoila.gg</span>
          <span className="font-medium text-primary">
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
        <FormLabel>Your post description</FormLabel>
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
            isLoading={isSubmitting}
            disabled={!formState.isValid || !formState.isDirty || isSubmitting}
          >
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
};