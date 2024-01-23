import { useCallback, useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

const SIGNIFICANT_CONTENT_LENGTH = 100;

const usePasteDetection = (): [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
] => {
  const [isPastedContent, setIsPastedContent] = useState<boolean>(false);

  const handlePaste = useCallback(() => {
    setIsPastedContent(true);
  }, []);

  useEffect(() => {
    window.addEventListener('paste', handlePaste);
    return () => {
      window.removeEventListener('paste', handlePaste);
    };
  }, [handlePaste]);

  return [isPastedContent, setIsPastedContent];
};

const getInitialPercentage = (postId: string): number => {
  if (typeof window !== 'undefined') {
    const savedPercentage = localStorage.getItem(
      `aiContentPercentage_${postId}`,
    );
    return savedPercentage ? Number(savedPercentage) : 0;
  }
  return 0;
};

const updateLocalStorage = (
  postId: string,
  aiContentPercentage: number,
): void => {
  localStorage.setItem(
    `aiContentPercentage_${postId}`,
    String(aiContentPercentage),
  );
  /* console.log(
    `Effect: AI content percentage updated in localStorage: ${aiContentPercentage}`,
  );*/
};

export const useAiContentPercentage = (
  initialCharacterCount: number,
  postId: string,
): {
  aiContentPercentage: number;
  handleContentChange: (arg0: number) => void;
} => {
  const [totalCharacterCount, setTotalCharacterCount] = useState<number>(
    initialCharacterCount,
  );
  const [aiCharacterCount, setAiCharacterCount] = useState<number>(0);
  const [aiContentPercentage, setAiContentPercentage] = useState<number>(() =>
    getInitialPercentage(postId),
  );
  const [previousCharacterCount, setPreviousCharacterCount] = useState<number>(
    initialCharacterCount,
  );
  const [isPastedContent, setIsPastedContent] = usePasteDetection();

  const calculateAiContentPercentage = (
    aiCharacterCount: number,
    totalCharacterCount: number,
  ) => {
    return totalCharacterCount === 0
      ? 0
      : (aiCharacterCount / totalCharacterCount) * 100;
  };

  const updateAiContentPercentage = (
    currentCharacterCount: number,
    previousCharacterCount: number,
  ) => {
    const characterDifference = currentCharacterCount - previousCharacterCount;
    let newTotalCharacterCount = totalCharacterCount;
    let newAiCharacterCount = aiCharacterCount;

    if (
      characterDifference > 0 &&
      !isPastedContent &&
      characterDifference > SIGNIFICANT_CONTENT_LENGTH
    ) {
      newTotalCharacterCount += characterDifference;
      newAiCharacterCount += characterDifference;
    } else if (characterDifference > 0) {
      newTotalCharacterCount += characterDifference;
    } else if (characterDifference < 0) {
      newTotalCharacterCount = Math.max(
        0,
        newTotalCharacterCount + characterDifference,
      );
      newAiCharacterCount = Math.max(
        0,
        newAiCharacterCount + characterDifference,
      );
    }

    const newAiContentPercentage = calculateAiContentPercentage(
      newAiCharacterCount,
      newTotalCharacterCount,
    );

    setTotalCharacterCount(newTotalCharacterCount);
    // console.log('Total character count set to:', newTotalCharacterCount);
    setAiCharacterCount(newAiCharacterCount);
    // console.log('AI character count set to:', newAiCharacterCount);
    setAiContentPercentage(newAiContentPercentage);
    // console.log('AI content percentage set to:', newAiContentPercentage);
    setPreviousCharacterCount(currentCharacterCount);
    // console.log('Previous character count set to:', currentCharacterCount);
  };

  const handleContentChange = useDebouncedCallback(
    (currentCharacterCount: number) => {
      // console.log('handleContentChange called:', currentCharacterCount);
      const characterDifference =
        currentCharacterCount - previousCharacterCount;
      let newTotalCharacterCount = totalCharacterCount;

      if (isPastedContent) {
        // console.log('Content pasted, ignoring for generation count');
        setIsPastedContent(false);
        if (characterDifference > 0) {
          newTotalCharacterCount += characterDifference;
        } else if (characterDifference < 0) {
          newTotalCharacterCount = Math.max(
            0,
            newTotalCharacterCount + characterDifference,
          );
        }
        setTotalCharacterCount(newTotalCharacterCount);
        // console.log(`Current total character count: ${newTotalCharacterCount}`);
      } else {
        updateAiContentPercentage(
          currentCharacterCount,
          previousCharacterCount,
        );
      }

      setPreviousCharacterCount(currentCharacterCount);
    },
    1000,
  );

  useEffect(
    () => updateLocalStorage(postId, aiContentPercentage),
    [aiContentPercentage, postId],
  );

  return { aiContentPercentage, handleContentChange };
};
