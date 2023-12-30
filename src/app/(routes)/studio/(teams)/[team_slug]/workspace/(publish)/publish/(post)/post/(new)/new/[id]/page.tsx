'use client';

import { TiptapCollabProvider } from '@hocuspocus/provider';

import 'iframe-resizer/js/iframeResizer.contentWindow';

import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import * as Y from 'yjs';

import { BlockEditor } from '#/components/tiptap/block-editor';

export interface AiState {
  isAiLoading: boolean;
  aiError?: string | null;
}

export default function Document({
  params,
}: {
  params: { id: string; team_slug: string };
}) {
  const [provider, setProvider] = useState<TiptapCollabProvider | null>(null);
  const [collabToken, setCollabToken] = useState<string | null>(null);
  const [aiToken, setAiToken] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const hasCollab = parseInt(searchParams.get('noCollab') as string) !== 1;

  const { id, team_slug } = params;

  useEffect(() => {
    // fetch data
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

      // set state when the data received
      setCollabToken(token);
    };

    dataFetch();
  }, []);

  useEffect(() => {
    // fetch data
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

      // set state when the data received
      setAiToken(token);
    };

    dataFetch();
  }, []);

  const ydoc = useMemo(() => new Y.Doc(), []);

  useLayoutEffect(() => {
    if (hasCollab && collabToken) {
      setProvider(
        new TiptapCollabProvider({
          // eslint-disable-next-line camelcase
          name: `${process.env.NEXT_PUBLIC_COLLAB_DOC_PREFIX}/${team_slug}/${id}`,
          appId: process.env.NEXT_PUBLIC_TIPTAP_COLLAB_APP_ID ?? '',
          token: collabToken,
          document: ydoc,
        }),
      );
    }
    // eslint-disable-next-line camelcase
  }, [setProvider, collabToken, ydoc, team_slug, id, hasCollab]);

  if ((hasCollab && (!collabToken || !provider)) || !aiToken) return;

  return (
    <>
      <BlockEditor
        aiToken={aiToken}
        hasCollab={hasCollab}
        ydoc={ydoc}
        provider={provider}
      />
    </>
  );
}
