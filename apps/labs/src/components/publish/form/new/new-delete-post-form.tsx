'use client';

import { useCallback, useTransition } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';

import { deletePost } from '#/lib/actions/publish/publish-actions';
import { APP_BP } from '#/lib/const';

import { ConfirmDeleteModal } from '#/components/modals/confirm-delete-modal';
import { Icons } from '#/components/shared/icons';
import { Button } from '#/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '#/components/ui/form';
import { Input } from '#/components/ui/input';
import { toast } from '#/components/ui/use-toast';

export default function NewDeletePostForm({
  postName,
  teamSlug,
}: {
  postName: string;
  teamSlug: string;
}) {
  const deletePostSchema = z.object({
    confirm: z.string().refine((input) => input === postName, {
      message: "Sorry, the input doesn't match the name.",
    }),
  });

  type DeletePostFormValues = z.infer<typeof deletePostSchema>;
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<DeletePostFormValues>({
    resolver: zodResolver(deletePostSchema),
    mode: 'onChange',
  });

  const displayPostName = postName || 'My untitled post';

  const processForm: SubmitHandler<DeletePostFormValues> = useCallback(
    (data) => {
      startTransition(async () => {
        if (data.confirm === (postName || 'My untitled post')) {
          const res = await deletePost(null, id, 'delete');
          if (res.error) {
            toast({
              title: 'Could not delete post',
              description: res.error,
              variant: 'destructive',
            });
          } else {
            toast({
              title: 'Post deleted',
              description: 'Your post was deleted successfully.',
              variant: 'success',
            });
            router.push(
              `${APP_BP}/${teamSlug}/workspace/publish/site/${res.siteId}`,
            );
          }
        }
      });
    },
    [postName, id, router, teamSlug, startTransition],
  );

  const handleDeleteConfirmation = useCallback(() => {
    form.handleSubmit(processForm)();
  }, [processForm, form]);

  return (
    <Form {...form}>
      <form className="space-y-8">
        <FormItem>
          <FormLabel required>Delete Post</FormLabel>
          <FormControl>
            <Input
              type="text"
              required
              placeholder={displayPostName}
              {...form.register('confirm')}
            />
          </FormControl>
          <FormDescription>
            Type in the name of your post as shown <b>{displayPostName}</b> to
            confirm.
          </FormDescription>
          <FormMessage />
        </FormItem>
        <div className="flex justify-end">
          <ConfirmDeleteModal item="post" onConfirm={handleDeleteConfirmation}>
            <Button
              variant="destructive"
              size="sm"
              disabled={
                !form.formState.isValid ||
                isPending ||
                !form.formState.isDirty ||
                form.watch('confirm') === ''
              }
            >
              {isPending ? (
                <>
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </Button>
          </ConfirmDeleteModal>
        </div>
      </form>
    </Form>
  );
}