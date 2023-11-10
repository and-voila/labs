'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { ConfirmModal } from '@/app/components/modals/confirm-modal';
import { Icons } from '@/app/components/shared/icons';
import { Button } from '@/app/components/ui/button';
import { toast } from '@/app/components/ui/use-toast';
import { useConfettiStore } from '@/app/hooks/use-confetti-store';

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
          title: 'Success!',
          description: 'Your playbook was unpublished.',
        });
      } else {
        await axios.patch(`/api/courses/${courseId}/publish`);
        toast({
          title: 'Woohoo!',
          description: 'Your playbook was just published!',
        });
        confetti.onOpen();
      }

      router.refresh();
    } catch {
      toast({
        title: 'Sorry about that.',
        description: 'An error occured, please try again.',
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
        title: 'OK then, done!',
        description:
          'Your playbook has been deleted, like totally, no evidence, nada, zilch.',
      });
      router.refresh();
      router.push('/learn/teacher/courses');
    } catch {
      toast({
        title: 'Yikes! An error occurred.',
        description:
          'Please try again and if the problem persists, take a deep breath, then hail the "Serenity Now" Gods.',
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
        variant={isPublished ? 'destructive' : 'custom'}
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
