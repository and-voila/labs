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
  initialContent: string,
  postId: string,
): {
  aiContentPercentage: number;
  handleContentChange: (arg0: string) => void;
} => {
  const [totalContentLength, setTotalContentLength] = useState<number>(
    initialContent.length,
  );
  const [aiContentLength, setAiContentLength] = useState<number>(0);
  const [aiContentPercentage, setAiContentPercentage] = useState<number>(() =>
    getInitialPercentage(postId),
  );
  const [previousContent, setPreviousContent] =
    useState<string>(initialContent);
  const [isPastedContent, setIsPastedContent] = usePasteDetection();

  const calculateAiContentPercentage = (
    aiContentLength: number,
    totalContentLength: number,
  ) => {
    return totalContentLength === 0
      ? 0
      : (aiContentLength / totalContentLength) * 100;
  };

  const updateAiContentPercentage = (
    currentContent: string,
    previousContent: string,
  ) => {
    const lengthDifference = currentContent.length - previousContent.length;
    let newTotalContentLength = totalContentLength;
    let newAiContentLength = aiContentLength;

    if (
      lengthDifference > 0 &&
      !isPastedContent &&
      lengthDifference > SIGNIFICANT_CONTENT_LENGTH
    ) {
      newTotalContentLength += lengthDifference;
      newAiContentLength += lengthDifference;
    } else if (lengthDifference > 0) {
      newTotalContentLength += lengthDifference;
    } else if (lengthDifference < 0) {
      newTotalContentLength = Math.max(
        0,
        newTotalContentLength + lengthDifference,
      );
      newAiContentLength = Math.max(0, newAiContentLength + lengthDifference);
    }

    const newAiContentPercentage = calculateAiContentPercentage(
      newAiContentLength,
      newTotalContentLength,
    );

    // console.log(`Current content length: ${newTotalContentLength}`);
    // console.log(`AI content length: ${newAiContentLength}`);
    // console.log(`AI content percentage: ${newAiContentPercentage}`);

    setTotalContentLength(newTotalContentLength);
    setAiContentLength(newAiContentLength);
    setAiContentPercentage(newAiContentPercentage);
    setPreviousContent(currentContent);
  };

  const handleContentChange = useDebouncedCallback((currentContent: string) => {
    const lengthDifference = currentContent.length - previousContent.length;
    let newTotalContentLength = totalContentLength;

    if (isPastedContent) {
      // console.log('Content pasted, ignoring for generation count');
      setIsPastedContent(false);
      if (lengthDifference > 0) {
        newTotalContentLength += lengthDifference;
      } else if (lengthDifference < 0) {
        newTotalContentLength = Math.max(
          0,
          newTotalContentLength + lengthDifference,
        );
      }
      setTotalContentLength(newTotalContentLength);
      // console.log(`Current content length: ${newTotalContentLength}`);
    } else {
      updateAiContentPercentage(currentContent, previousContent);
    }

    setPreviousContent(currentContent);
  }, 300);

  useEffect(
    () => updateLocalStorage(postId, aiContentPercentage),
    [aiContentPercentage, postId],
  );

  return { aiContentPercentage, handleContentChange };
};
