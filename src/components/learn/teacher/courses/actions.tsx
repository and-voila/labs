'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { APP_BP } from '#/lib/const';

import { ConfirmModal } from '#/components/modals/confirm-modal';
import { Icons } from '#/components/shared/icons';
import { Button } from '#/components/ui/button';
import { toast } from '#/components/ui/use-toast';

import { useConfettiStore } from '#/hooks/use-confetti-store';

interface ActionsProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
}

export const Actions = ({ disabled, courseId, isPublished }: ActionsProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/unpublish`);
        toast({
          title: 'Playbook unpublished',
          description:
            'You just unpublished your Playbook. No worries, you can publish it again.',
          variant: 'success',
        });
      } else {
        await axios.patch(`/api/courses/${courseId}/publish`);
        toast({
          title: 'Playbook published',
          description:
            'Nice! You just published your Playbook. Let the learning begin.',
          variant: 'success',
        });
        confetti.onOpen();
      }

      router.refresh();
    } catch {
      toast({
        title: 'Could not update Playbook',
        description:
          'An error occured. It happens and we appreciate your patience. Please try again. If the problem persists, holla at Ambreen.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/courses/${courseId}`);

      toast({
        title: 'Playbook deleted',
        description:
          'Your playbook has been deleted, like totally, no evidence, nada, zilch.',
        variant: 'success',
      });
      router.refresh();
      router.push(`${APP_BP}/admin/teacher/courses`);
    } catch {
      toast({
        title: 'Unable to delete Playbook',
        description:
          "We couldn't process your request. It wasn't intentional. Please try again.",
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant={isPublished ? 'secondary' : 'default'}
        size="sm"
      >
        {isPublished ? 'Unpublish' : 'Publish'}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button variant="destructive" size="sm" disabled={isLoading}>
          <Icons.trash className="h-4 w-4 text-white" />
        </Button>
      </ConfirmModal>
    </div>
  );
};
