// import { WebSocketStatus } from '@hocuspocus/provider';
import type { PureEditorContent } from '@tiptap/react';

import React, { useCallback, useMemo, useRef } from 'react';
import { EditorContent } from '@tiptap/react';

import { useBlockEditor } from '#/hooks/tiptap/use-block-editor';

import '../../../../../packages/ui/src/styles/partials/index.css';

import type { TiptapProps } from '#/lib/types';

import { createPortal } from 'react-dom';

import { ColumnsMenu } from '@av/editor/columns-menu';
import { ContentItemMenu } from '@av/editor/content-item-menu';
import ImageBlockMenu from '@av/editor/image-block-menu';
import { LinkMenu } from '@av/editor/link-menu';
import { Loader } from '@av/editor/loader';
import TableColumnMenu from '@av/editor/table-column-menu';
import TableRowMenu from '@av/editor/table-row-menu';
import { TextMenu } from '@av/editor/text-menu';

import { AiEditorContext } from '#/context/ai-editor-context';
import { useAIState } from '#/hooks/tiptap/use-ai-state';

import AiEditorWidget from './ai-editor-widget';

export const AiEditor = ({
  aiToken,
  ydoc,
  provider,
  user,
  post,
  teamSlug,
}: TiptapProps) => {
  const aiState = useAIState();
  const menuContainerRef = useRef(null);
  const editorRef = useRef<PureEditorContent | null>(null);

  const setEditorRef = useCallback((instance: HTMLDivElement | null) => {
    if (instance) {
      editorRef.current = instance as unknown as PureEditorContent;
    } else {
      editorRef.current = null;
    }
  }, []);

  const { editor, users, characterCount, collabState } = useBlockEditor({
    aiToken,
    ydoc,
    provider,
    user,
  });

  const displayedUsers = users.slice(0, 3);

  const providerValue = useMemo(() => {
    return {
      isAiLoading: aiState.isAiLoading,
      aiError: aiState.aiError,
      setIsAiLoading: aiState.setIsAiLoading,
      setAiError: aiState.setAiError,
    };
  }, [aiState]);

  if (!editor) {
    return null;
  }

  const aiLoaderPortal = createPortal(
    <Loader label="AI is now doing its job." />,
    document.body,
  );

  return (
    <AiEditorContext.Provider value={providerValue}>
      <div
        className="relative flex h-full flex-1 flex-col"
        ref={menuContainerRef}
      >
        <div className="mx-auto flex w-full max-w-7xl items-start gap-x-4 px-4">
          <main className="flex-1">
            <EditorContent
              editor={editor}
              ref={setEditorRef}
              className="flex-1 overflow-y-auto"
            />
            <ContentItemMenu editor={editor} />
            <LinkMenu editor={editor} appendTo={menuContainerRef} />
            <TextMenu editor={editor} />
            <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
            <TableRowMenu editor={editor} appendTo={menuContainerRef} />
            <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
            <ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
          </main>
          <aside className="sticky top-36 hidden w-96 shrink-0 xl:block">
            <AiEditorWidget
              characterCount={characterCount}
              collabState={collabState}
              displayedUsers={displayedUsers}
              editor={editor}
              post={post}
              teamSlug={teamSlug}
            />
          </aside>
        </div>
      </div>
      {aiState.isAiLoading && aiLoaderPortal}
    </AiEditorContext.Provider>
  );
};

export default AiEditor;
