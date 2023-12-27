'use client';

import { useCallback } from 'react';
import ReactConfetti from 'react-confetti';

import { useConfettiStore } from '#/hooks/use-confetti-store';

export const ConfettiProvider = () => {
  const confetti = useConfettiStore();

  const handleConfettiComplete = useCallback(() => {
    confetti.onClose();
  }, [confetti]);

  if (!confetti.isOpen) return null;

  return (
    <ReactConfetti
      className="pointer-events-none z-[100]"
      numberOfPieces={500}
      recycle={false}
      onConfettiComplete={handleConfettiComplete}
    />
  );
};
