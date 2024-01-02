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

export const EditorContext = createContext<AiEditorContext>({
  isAiLoading: false,
  aiError: null,
  setIsAiLoading: () => {},
  setAiError: () => {},
});
