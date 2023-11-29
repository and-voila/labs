import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export const useGenerationCount = (initialContent: string, postId: string) => {
  const [generationCount, setGenerationCount] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedCount = localStorage.getItem(`generationCount_${postId}`);
      return savedCount ? Number(savedCount) : 0;
    }
    return 0;
  });
  const [previousContent, setPreviousContent] = useState(initialContent);

  const handleContentChange = useDebouncedCallback((currentContent: string) => {
    if (!previousContent && currentContent && currentContent.length > 100) {
      setGenerationCount(() => {
        //console.log('Generation count set to 5');
        return 5;
      });
    } else if (!currentContent) {
      setGenerationCount(() => {
        //console.log('Generation count reset to 0');
        return 0;
      });
    } else {
      const lengthDifference = currentContent.length - previousContent.length;

      if (lengthDifference > 100) {
        setGenerationCount((prevCount) => {
          const newCount = prevCount + 1;
          //console.log('Generation count increased:', newCount);
          return newCount;
        });
      } else if (lengthDifference < -100) {
        setGenerationCount((prevCount) => {
          const newCount = Math.max(0, prevCount - 1);
          //console.log('Generation count decreased:', newCount);
          return newCount;
        });
      }
    }

    setPreviousContent(currentContent);
  }, 300);

  useEffect(() => {
    localStorage.setItem(`generationCount_${postId}`, String(generationCount));
  }, [generationCount, postId]);

  return { generationCount, handleContentChange };
};
