'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { Icons } from '@/app/components/shared/icons';
import { Button } from '@/app/components/ui/button';
import { toast } from '@/app/components/ui/use-toast';

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
        router.push(`/learn/courses/${courseId}/chapters/${firstChapterId}`);
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
      className="mt-2 w-full flex-shrink-0 md:mt-0 md:w-auto"
    >
      Start Playbook
      <Icons.play className="ml-2 h-4 w-4" />
    </Button>
  );
};
