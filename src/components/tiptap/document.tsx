'use client';

import { TiptapCollabProvider } from '@hocuspocus/provider';

import 'iframe-resizer/js/iframeResizer.contentWindow';

import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import * as Y from 'yjs';

import { env } from 'env';

import { BlockEditor } from '#/components/tiptap/block-editor/block-editor';

import { EditorUser } from './block-editor/types';

export interface AiState {
  isAiLoading: boolean;
  aiError?: string | null;
}

interface DocumentProps {
  postId: string;
  user: EditorUser;
}

export default function Document({ postId, user }: DocumentProps) {
  const [provider, setProvider] = useState<TiptapCollabProvider | null>(null);
  const [collabToken, setCollabToken] = useState<string | null>(null);
  const [aiToken, setAiToken] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const hasCollab = parseInt(searchParams.get('noCollab') as string) !== 1;

  useEffect(() => {
    const dataFetch = async () => {
      const data = await (
        await fetch('/api/collaboration', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })
      ).json();

      const { token } = data;

      setCollabToken(token);
    };

    dataFetch();
  }, []);

  useEffect(() => {
    const dataFetch = async () => {
      const data = await (
        await fetch('/api/ai', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })
      ).json();

      const { token } = data;

      setAiToken(token);
    };

    dataFetch();
  }, []);

  const ydoc = useMemo(() => new Y.Doc(), []);

  useLayoutEffect(() => {
    if (hasCollab && collabToken) {
      setProvider(
        new TiptapCollabProvider({
          name: `${env.NEXT_PUBLIC_COLLAB_DOC_PREFIX}${postId}`,
          appId: env.NEXT_PUBLIC_TIPTAP_COLLAB_APP_ID ?? '',
          token: collabToken,
          document: ydoc,
        }),
      );
    }
  }, [setProvider, collabToken, ydoc, postId, hasCollab]);

  if ((hasCollab && (!collabToken || !provider)) || !aiToken) return;

  return (
    <>
      <BlockEditor
        aiToken={aiToken}
        hasCollab={hasCollab}
        ydoc={ydoc}
        provider={provider}
        user={user}
      />
    </>
  );
}
