'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import MuxPlayer from '@mux/mux-player-react/lazy';
import axios from 'axios';

import { APP_BP } from '#/lib/const';
import { cn } from '#/lib/utils';

import { Icons } from '#/components/shared/icons';
import { toast } from '#/components/ui/use-toast';

import { useConfettiStore } from '#/hooks/use-confetti-store';

interface VideoPlayerProps {
  playbackId: string;
  courseId: string;
  chapterId: string;
  nextChapterId?: string;
  completeOnEnd: boolean;
  title: string;
  teamSlug: string;
}

export const VideoPlayer = ({
  playbackId,
  courseId,
  chapterId,
  nextChapterId,
  completeOnEnd,
  title,
  teamSlug,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  const confetti = useConfettiStore();

  const handleCanPlay = useCallback(() => {
    setIsReady(true);
  }, []);

  const onEnd = useCallback(async () => {
    try {
      if (completeOnEnd) {
        await axios.put(
          `/api/courses/${courseId}/chapters/${chapterId}/progress`,
          {
            isCompleted: true,
          },
        );

        if (!nextChapterId) {
          confetti.onOpen();
        }

        toast({
          title: 'Your progress has been updated',
          description:
            "Great stuff! Keep it up. Don't forget to give us your feedback when you have a chance. We're all ears.",
          variant: 'success',
        });
        router.refresh();

        if (nextChapterId) {
          router.push(
            `${APP_BP}/${teamSlug}/workspace/learn/courses/${courseId}/chapters/${nextChapterId}`,
          );
        }
      }
    } catch {
      toast({
        title: 'Oh no! Unable to update your progress',
        description:
          'Please try again and give us a heads up if the problem persists. Thank you for your patience.',
        variant: 'destructive',
      });
    }
  }, [
    completeOnEnd,
    courseId,
    chapterId,
    nextChapterId,
    confetti,
    router,
    teamSlug,
  ]);

  return (
    <div className="relative aspect-video">
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-primary/20">
          <Icons.spinner className="h-8 w-8 animate-spin text-foreground" />
        </div>
      )}
      <MuxPlayer
        title={title}
        className={cn(!isReady && 'hidden')}
        onCanPlay={handleCanPlay}
        onEnded={onEnd}
        autoPlay
        playbackId={playbackId}
        accentColor="#6847c2"
      />
    </div>
  );
};
