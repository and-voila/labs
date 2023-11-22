'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { Icons } from '@/app/components/shared/icons';
import { Button } from '@/app/components/ui/button';
import { toast } from '@/app/components/ui/use-toast';
import { useConfettiStore } from '@/app/hooks/use-confetti-store';

interface CourseProgressButtonProps {
  chapterId: string;
  courseId: string;
  isCompleted?: boolean;
  nextChapterId?: string;
}

export const CourseProgressButton = ({
  chapterId,
  courseId,
  isCompleted,
  nextChapterId,
}: CourseProgressButtonProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      await axios.put(
        `/api/courses/${courseId}/chapters/${chapterId}/progress`,
        {
          isCompleted: !isCompleted,
        },
      );

      if (!isCompleted && !nextChapterId) {
        confetti.onOpen();
      }

      if (!isCompleted && nextChapterId) {
        router.push(`/learn/courses/${courseId}/chapters/${nextChapterId}`);
      }

      toast({
        title: 'Playbook progress updated',
        description:
          'Great job! Your progress for this Playbook has been updated.',
        variant: 'success',
      });
      router.refresh();
    } catch {
      toast({
        title: 'Unable to update playbook progress',
        description:
          "We're so sorry. We couldn't update your playbook progress. Please try again or let us know if the problem persists. Thank you.",
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const Icon: React.ElementType = isCompleted
    ? Icons.crossCircled
    : Icons.circleChecked;

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      type="button"
      variant={isCompleted ? 'outline' : 'custom'}
      className="w-full flex-shrink-0 md:w-auto"
    >
      {isCompleted ? 'Unfinish' : 'Finish'}
      <Icon className={`ml-2 h-4 w-4 ${isCompleted ? 'text-brand' : ''}`} />
    </Button>
  );
};
