import { useContext, useEffect, useMemo, useState } from 'react';
import { TiptapCollabProvider, WebSocketStatus } from '@hocuspocus/provider';
import Ai from '@tiptap-pro/extension-ai';
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import { useEditor } from '@tiptap/react';
import * as Y from 'yjs';

import { userColors, userNames } from '#/lib/tiptap/constants';
import { initialContent } from '#/lib/tiptap/data/initial-content';
import { randomElement } from '#/lib/tiptap/utils';

import { EditorUser } from '#/components/tiptap/block-editor/types';

import { EditorContext } from '#/context/tiptap/editor-context';
import { ExtensionKit } from '#/extensions/extension-kit';

import { useSidebar } from './use-sidebar';

const TIPTAP_AI_APP_ID = process.env.NEXT_PUBLIC_TIPTAP_AI_APP_ID;
const TIPTAP_AI_BASE_URL =
  process.env.NEXT_PUBLIC_TIPTAP_AI_BASE_URL || 'https://api.tiptap.dev/v1/ai';

export const useBlockEditor = ({
  aiToken,
  ydoc,
  provider,
}: {
  aiToken: string;
  ydoc: Y.Doc;
  provider?: TiptapCollabProvider | null | undefined;
}) => {
  const leftSidebar = useSidebar();
  const [collabState, setCollabState] = useState<WebSocketStatus>(
    WebSocketStatus.Connecting,
  );
  const { setIsAiLoading, setAiError } = useContext(EditorContext);

  const editor = useEditor(
    {
      autofocus: true,
      onCreate: ({ editor }) => {
        provider?.on('synced', () => {
          if (editor.isEmpty) {
            editor.commands.setContent(initialContent);
          }
        });
      },
      extensions: [
        ...ExtensionKit({
          provider,
        }),
        Collaboration.configure({
          document: ydoc,
        }),
        CollaborationCursor.configure({
          provider,
          user: {
            name: randomElement(userNames),
            color: randomElement(userColors),
          },
        }),
        Ai.configure({
          appId: TIPTAP_AI_APP_ID,
          token: aiToken,
          baseUrl: TIPTAP_AI_BASE_URL,
          autocompletion: true,
          onLoading: () => {
            setIsAiLoading(true);
            setAiError(null);
          },
          onSuccess: () => {
            setIsAiLoading(false);
            setAiError(null);
          },
          onError: (error) => {
            setIsAiLoading(false);
            setAiError(error.message);
          },
        }),
      ],
      editorProps: {
        attributes: {
          autocomplete: 'off',
          autocorrect: 'off',
          autocapitalize: 'off',
          class: 'min-h-full',
        },
      },
    },
    [ydoc, provider],
  );

  const users = useMemo(() => {
    if (!editor?.storage.collaborationCursor?.users) {
      return [];
    }

    return editor.storage.collaborationCursor?.users.map((user: EditorUser) => {
      const names = user.name?.split(' ');
      const firstName = names?.[0];
      const lastName = names?.[names.length - 1];
      const initials = `${firstName?.[0] || '?'}${lastName?.[0] || '?'}`;

      return { ...user, initials: initials.length ? initials : '?' };
    });
  }, [editor?.storage.collaborationCursor?.users]);

  const characterCount = editor?.storage.characterCount || {
    characters: () => 0,
    words: () => 0,
  };

  useEffect(() => {
    provider?.on('status', (event: { status: WebSocketStatus }) => {
      setCollabState(event.status);
    });
  }, [provider]);

  // @ts-expect-error TODO:
  window.editor = editor;

  return { editor, users, characterCount, collabState, leftSidebar };
};
