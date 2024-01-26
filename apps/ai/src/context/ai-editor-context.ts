// TODO:
import { createContext } from 'react';

interface AiEditorContext {
  isAiLoading: boolean;
  aiError?: string | null;
  // eslint-disable-next-line @typescript-eslint/ban-types
  setIsAiLoading: Function;
  // eslint-disable-next-line @typescript-eslint/ban-types
  setAiError: Function;
}

export const AiEditorContext = createContext<AiEditorContext>({
  isAiLoading: false,
  aiError: null,
  setIsAiLoading: () => {
    // eslint-disable-next-line no-console
    console.warn('setIsAiLoading function is not implemented yet');
  },
  setAiError: () => {
    // eslint-disable-next-line no-console
    console.warn('setAiError function is not implemented yet');
  },
});
