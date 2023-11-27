import { Dispatch } from 'react';

import {
  EditorAction,
  EditorState,
} from '@/app/components/write/editor/editor';
import { cn } from '@/app/lib/utils';

interface EditorStatusIndicatorProps {
  isPendingSaving: boolean;
  state: EditorState;
  dispatch: Dispatch<EditorAction>;
}

export const EditorStatusIndicator: React.FC<EditorStatusIndicatorProps> = ({
  isPendingSaving,
  state,
}) => {
  return (
    <div
      className={cn(
        'mr-2 inline-flex items-center rounded-lg px-2 py-1 text-sm ',
        isPendingSaving
          ? 'bg-muted-foreground/20 text-muted-foreground'
          : (!state.data.title || !state.data.description) &&
              (state.titleError || state.descriptionError)
            ? 'bg-destructive text-white'
            : 'bg-alternate/20 text-alternate',
      )}
    >
      {isPendingSaving
        ? 'Saving...'
        : (!state.data.title || !state.data.description) &&
            (state.titleError || state.descriptionError)
          ? 'Not saved'
          : 'Saved'}
    </div>
  );
};
