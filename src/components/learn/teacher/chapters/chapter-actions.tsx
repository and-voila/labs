'use client';

import { useCallback, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { APP_BP } from '#/lib/const';

import { ConfirmModal } from '#/components/modals/confirm-modal';
import { Icons } from '#/components/shared/icons';
import { Button } from '#/components/ui/button';
import { toast } from '#/components/ui/use-toast';

interface ChapterActionsProps {
  disabled: boolean;
  courseId: string;
  chapterId: string;
  isPublished: boolean;
}

export const ChapterActions = ({
  disabled,
  courseId,
  chapterId,
  isPublished,
}: ChapterActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = useCallback(async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}/unpublish`,
        );
        toast({
          title: 'Your Play was unpublished',
          description:
            'We hope you enjoyed it while it lasted. Hurry, make the edits and publish it again.',
          variant: 'success',
        });
      } else {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}/publish`,
        );
        toast({
          title: 'Nice! Your Play is published',
          description:
            'Way to go, you just made the world smarter. Now onward to the next act of enlightenment.',
          variant: 'success',
        });
      }

      router.refresh();
    } catch {
      toast({
        title: 'Oops! Unable to update Play',
        description:
          "We're sorry but Sam distracted by the affections of Juno when he wrote this code. Please try updating your Play again.",
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [isPublished, courseId, chapterId, router]);

  const onDelete = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);

      toast({
        title: 'Your Play has been deleted',
        description:
          "Yikes, we hope you meant to do that. Your Play is gone, like forever. That's kind of permanent, you know.",
        variant: 'success',
      });
      router.refresh();
      router.push(`${APP_BP}/admin/teacher/courses/${courseId}`);
    } catch {
      toast({
        title: 'We could not delete your Play',
        description:
          "An unexpected error occured. It's usually a temporary glitch in the Matrix. Please try again.",
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [courseId, chapterId, router]);

  return (
    <div className="my-4 flex w-full flex-col items-center gap-4 rounded-md border bg-card p-2 sm:my-0 sm:w-auto sm:flex-row md:gap-2">
      <Link
        href={`${APP_BP}/admin/teacher/courses/${courseId}`}
        className="w-full"
      >
        <Button variant="outline" className="w-full md:w-auto" size="sm">
          Back to playbook
        </Button>
      </Link>
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="default"
        size="sm"
        className="w-full md:w-auto"
      >
        {isPublished ? 'Unpublish' : 'Publish'}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button
          size="sm"
          disabled={isLoading}
          variant="destructive"
          className="w-full md:w-auto"
        >
          <Icons.trash className="h-4 w-4 bg-destructive text-white" />
        </Button>
      </ConfirmModal>
    </div>
  );
};
