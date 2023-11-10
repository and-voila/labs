'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MuxPlayer from '@mux/mux-player-react';
import axios from 'axios';

import { Icons } from '@/app/components/shared/icons';
import { toast } from '@/app/components/ui/use-toast';
import { useConfettiStore } from '@/app/hooks/use-confetti-store';
import { cn } from '@/app/lib/utils';

interface VideoPlayerProps {
  playbackId: string;
  courseId: string;
  chapterId: string;
  nextChapterId?: string;
  completeOnEnd: boolean;
  title: string;
}

export const VideoPlayer = ({
  playbackId,
  courseId,
  chapterId,
  nextChapterId,
  completeOnEnd,
  title,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  const confetti = useConfettiStore();

  const onEnd = async () => {
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
          title: 'Good stuff!',
          description: 'Your progress has been updated.',
        });
        router.refresh();

        if (nextChapterId) {
          router.push(`/learn/courses/${courseId}/chapters/${nextChapterId}`);
        }
      }
    } catch {
      toast({
        title: 'Ugh! Something just broke.',
        description:
          'Please try again and give us a heads up if the problem persists. Thank you for your patience.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="relative aspect-video">
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-brand/20">
          <Icons.spinner className="h-8 w-8 animate-spin text-foreground" />
        </div>
      )}
      <MuxPlayer
        title={title}
        className={cn(!isReady && 'hidden')}
        onCanPlay={() => setIsReady(true)}
        onEnded={onEnd}
        autoPlay
        playbackId={playbackId}
        accentColor="#6847c2"
      />
    </div>
  );
};
