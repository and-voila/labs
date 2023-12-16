'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { APP_BP } from '#/lib/const';

import { Button } from '#/components/ui/button';
import { toast } from '#/components/ui/use-toast';

interface StartCourseButtonProps {
  chapterId: string;
  courseId: string;
  isStarted?: boolean;
  firstChapterId: string;
}

export const StartCourseButton = ({
  chapterId,
  courseId,
  isStarted,
  firstChapterId,
}: StartCourseButtonProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      await axios.put(
        `/api/courses/${courseId}/chapters/${chapterId}/started`,
        {
          isStarted: true,
        },
      );

      if (!isStarted) {
        router.push(
          `${APP_BP}/workspace/learn/courses/${courseId}/chapters/${firstChapterId}`,
        );
      }

      toast({
        title: 'Playbook started #LFG',
        description:
          "Woohoo! You're on your way to learn new things and make us all smarter.",
        variant: 'success',
      });
      router.refresh();
    } catch {
      toast({
        title: 'Unable to start Playbook',
        description:
          'Our bad, an error occured and we couldn’t start your Playbook. Please try again. Please let us know if the problem persists.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      type="button"
      variant="default"
      className="w-full flex-shrink-0 md:mt-0 md:w-auto"
    >
      Start
    </Button>
  );
};
