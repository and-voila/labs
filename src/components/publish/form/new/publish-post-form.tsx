'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Post, Site } from '@prisma/client';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import slugify from 'slugify';
import * as z from 'zod';

import { publishPost } from '#/lib/actions/publish/publish-actions';
import { APP_BP } from '#/lib/const';
import { GetTeamMemberResult } from '#/lib/operations/teams/get-team-members';
import { publishPostSchema } from '#/lib/validations/post';

import Uploader from '#/components/publish/form/uploader';
import { Icons } from '#/components/shared/icons';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#/components/ui/select';
import { Textarea } from '#/components/ui/textarea';
import { toast } from '#/components/ui/use-toast';

type PublishPostFormProps = {
  post: Post & { site: Site };
  teamMembers: GetTeamMemberResult | null;
  teamSlug: string;
};

export type PublishPostFormValues = z.infer<typeof publishPostSchema>;

export function PublishPostForm({
  post,
  teamMembers,
  teamSlug,
}: PublishPostFormProps) {
  const form = useForm<PublishPostFormValues>({
    resolver: zodResolver(publishPostSchema),
    defaultValues: {
      title: post.title || '',
      description: post.description || '',
      slug: post.slug || '',
      author: post?.userId ?? '',
    },
    mode: 'onChange',
  });

  const watchedTitle = form.watch('title', post.title ?? '');
  const watchedDescription = form.watch('description', post.description ?? '');

  const router = useRouter();

  const renderTitleField = useCallback(
    ({ field }: { field: FieldValues }) => (
      <FormItem>
        <FormLabel required>Title</FormLabel>
        <FormControl>
          <Input
            placeholder={
              post.title || 'Your engaging title here (42-58 characters)'
            }
            {...field}
          />
        </FormControl>
        <FormDescription>
          Titles between 42-58 characters tend to attract more views.
        </FormDescription>
        <FormMessage />
      </FormItem>
    ),
    [post.title],
  );

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'title' && value.title) {
        const slug = slugify(value.title, {
          lower: true,
          strict: true,
        });
        if (!form.formState.dirtyFields.slug) {
          form.setValue('slug', slug, { shouldValidate: true });
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const renderSlugField = useCallback(
    ({ field }: { field: FieldValues }) => (
      <FormItem>
        <FormLabel required>Post slug</FormLabel>
        <FormControl>
          <Input
            placeholder={
              post.slug || 'Set a catchy, human-readable slug for your post'
            }
            {...field}
          />
        </FormControl>
        <FormDescription>
          Use the default or create a unique slug for easy sharing.
        </FormDescription>
        <FormMessage />
      </FormItem>
    ),
    [post.slug],
  );

  const handleAuthorChange = useCallback(
    (value: string) => {
      form.setValue('author', value);
    },
    [form],
  );

  const renderAuthorField = useCallback(() => {
    const placeholderText =
      teamMembers && teamMembers.length === 1
        ? teamMembers[0].user.name
        : 'Select the author of the post';

    return (
      <FormItem>
        <FormLabel required>Author</FormLabel>
        <Select onValueChange={handleAuthorChange}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder={placeholderText} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {teamMembers?.map((member) => (
              <SelectItem key={member.user.id} value={member.user.id}>
                {member.user.name ?? 'Name not set'}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FormDescription>
          Choose the author. Want a different name? Update it in your{' '}
          <Link
            className="text-primary underline underline-offset-4 hover:text-primary/80"
            href={`${APP_BP}/my/settings`}
          >
            personal settings
          </Link>
        </FormDescription>
        <FormMessage />
      </FormItem>
    );
  }, [teamMembers, handleAuthorChange]);

  const renderDescriptionField = useCallback(
    ({ field }: { field: FieldValues }) => (
      <FormItem>
        <FormLabel required>Description</FormLabel>
        <FormControl>
          <Textarea
            placeholder={
              post.description ||
              'Summarize your post in 120-158 characters for optimal search visibility'
            }
            {...field}
            className="resize-none"
          />
        </FormControl>
        <FormDescription>
          Aim for 120-158 characters. This sweet spot boosts search performance
          and reader engagement.
        </FormDescription>
        <FormMessage />
      </FormItem>
    ),
    [post.description],
  );

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(
    post.image ? post.image : null,
  );

  const handleImageChange = useCallback(
    (value: string | null) => {
      form.setValue('image', value);
      if (typeof value === 'string' && value.startsWith('blob:')) {
        fetch(value)
          .then((res) => res.blob())
          .then((blob) => {
            const newFile = new File([blob], 'image', { type: blob.type });
            setImageFile(newFile);
            setImagePreviewUrl(URL.createObjectURL(newFile));
          });
      } else {
        setImageFile(null);
        setImagePreviewUrl(null);
      }
    },
    [form],
  );

  const renderImageField = useCallback(
    ({}: { field: FieldValues }) => (
      <FormItem>
        <FormLabel required>Image</FormLabel>
        <FormControl>
          <Uploader
            defaultValue={post.image}
            name="image"
            onChange={handleImageChange}
          />
        </FormControl>
        <FormDescription>
          Upload a captivating image. It&apos;ll be the face of your post in
          searches and social shares.
        </FormDescription>
        <FormMessage />
      </FormItem>
    ),
    [handleImageChange, post.image],
  );

  const processForm: SubmitHandler<PublishPostFormValues> = async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key !== 'image') {
        formData.append(key, value);
      }
    });

    if (imageFile) {
      formData.append('image', imageFile);
    }

    if (!post.site) {
      toast({
        title: 'Error',
        description: 'Post must have an associated site.',
        variant: 'destructive',
      });
      // eslint-disable-next-line no-console
      console.error('Post must have an associated site.');
      return;
    }

    try {
      const result = await publishPost(formData, post);

      if (result.error) {
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive',
        });
        // eslint-disable-next-line no-console
        console.error(result.error);
      } else {
        toast({
          title: 'Success',
          description: 'Your post has been published successfully.',
          variant: 'success',
        });
        form.reset();
        setImageFile(null);
        setImagePreviewUrl(post.image);
        setTimeout(() => {
          router.push(
            `${APP_BP}/${teamSlug}/workspace/publish/post/${post.id}/metadata`,
          );
        }, 2000);
      }
    } catch (error: unknown) {
      let message = 'An unexpected error occurred.';
      if (error instanceof Error) {
        message = error.message;
      }

      toast({
        title: 'Unexpected Error',
        description: message,
        variant: 'destructive',
      });
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  return (
    <div className="flex w-full max-w-7xl items-start gap-x-12">
      <main className="max-w-3xl flex-1">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(processForm)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={renderTitleField}
            />
            <FormField
              control={form.control}
              name="slug"
              render={renderSlugField}
            />
            <FormField
              control={form.control}
              name="author"
              render={renderAuthorField}
            />
            <FormField
              control={form.control}
              name="description"
              render={renderDescriptionField}
            />
            <FormField
              control={form.control}
              name="image"
              render={renderImageField}
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={
                  !form.formState.isDirty ||
                  !form.formState.isValid ||
                  form.formState.isSubmitting
                }
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    Publishing...
                  </>
                ) : (
                  'Publish'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </main>

      {/* h/t our friends at Dub.co and Steven Tey for this OSS gem */}
      <aside className="sticky top-16 hidden w-96 shrink-0 xl:block">
        <div className="grid gap-8">
          {/* Twitter */}
          <div>
            <div className="relative mb-2">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t" />
              </div>
              <div className="relative flex justify-center">
                <div className="flex items-center space-x-2 bg-background px-3">
                  <Icons.twitter className="h-4 w-4 text-[#1DA1F2]" />
                  <p className="text-sm uppercase tracking-widest text-primary">
                    Twitter
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl border">
              {imagePreviewUrl ? (
                <Image
                  priority
                  src={imagePreviewUrl}
                  width={500}
                  height={300}
                  alt={watchedTitle || 'Image preview'}
                />
              ) : (
                <div>Image preview not available</div>
              )}
              {watchedTitle && (
                <div className="absolute bottom-2 left-2 mr-2 rounded-md bg-[#414142] py-px">
                  <h3 className="line-clamp-1 max-w-sm px-1.5 text-sm text-foreground">
                    {watchedTitle}
                  </h3>
                </div>
              )}
            </div>
          </div>

          {/* Facebook */}
          <div>
            <div className="relative mb-2">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t" />
              </div>
              <div className="relative flex justify-center">
                <div className="flex items-center space-x-2 bg-background px-3">
                  <Icons.facebook className="h-4 w-4 text-[#1877F2]" />
                  <p className="text-sm uppercase tracking-widest text-primary">
                    Facebook
                  </p>
                </div>
              </div>
            </div>
            <div className="border">
              {imagePreviewUrl ? (
                <Image
                  priority
                  src={imagePreviewUrl}
                  width={500}
                  height={300}
                  alt={watchedTitle || 'Image preview'}
                />
              ) : (
                <div>Image preview not available</div>
              )}
              <div className="grid gap-1 border-t bg-card p-3">
                {post.site?.subdomain ? (
                  <p className="text-[0.8rem] uppercase text-muted-foreground">
                    {post.site?.subdomain}
                  </p>
                ) : (
                  <div className="mb-1 h-4 w-24 rounded-md bg-primary/20" />
                )}
                {watchedTitle ? (
                  <h3 className="truncate font-semibold text-foreground">
                    {watchedTitle}
                  </h3>
                ) : (
                  <div className="mb-1 h-5 w-full rounded-md bg-primary/20" />
                )}
                {watchedDescription ? (
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {watchedDescription}
                  </p>
                ) : (
                  <div className="grid gap-2">
                    <div className="h-4 w-full rounded-md bg-primary/20" />
                    <div className="h-4 w-48 rounded-md bg-primary/20" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* LinkedIn */}
          <div>
            <div className="relative mb-2">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t" />
              </div>
              <div className="relative flex justify-center">
                <div className="flex items-center space-x-2 bg-background px-3">
                  <Icons.linkedin className="h-4 w-4 text-[#0072b1]" />
                  <p className="text-sm uppercase tracking-widest text-primary">
                    LinkedIn
                  </p>
                </div>
              </div>
            </div>
            <div className="overflow-hidden rounded-[2px] shadow-[0_0_0_1px_rgba(0,0,0,0.15),0_2px_3px_rgba(0,0,0,0.2)]">
              {imagePreviewUrl ? (
                <Image
                  priority
                  src={imagePreviewUrl}
                  width={500}
                  height={300}
                  alt={watchedTitle || 'Image preview'}
                />
              ) : (
                <div>Image preview not available</div>
              )}
              <div className="grid gap-1 border-t bg-card p-3">
                {watchedTitle ? (
                  <h3 className="truncate font-semibold text-foreground">
                    {watchedTitle}
                  </h3>
                ) : (
                  <div className="mb-1 h-5 w-full rounded-md bg-primary/20" />
                )}
                {post.site?.subdomain ? (
                  <p className="text-xs text-muted-foreground">
                    {post.site?.subdomain}
                  </p>
                ) : (
                  <div className="mb-1 h-4 w-24 rounded-md bg-primary/20" />
                )}
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
