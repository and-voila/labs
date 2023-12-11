import { Dispatch } from 'react';

import { EditorAction, EditorState } from '#/components/write/editor/editor';
import { cn } from '#/lib/utils';

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
        'mr-2 inline-flex items-center rounded-md px-3 text-xs font-medium ',
        isPendingSaving
          ? 'text-muted-foreground'
          : (!state.data.title || !state.data.description) &&
              (state.titleError || state.descriptionError)
            ? 'text-destructive'
            : 'text-alternate',
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
