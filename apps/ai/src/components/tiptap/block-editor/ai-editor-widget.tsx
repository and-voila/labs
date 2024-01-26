import type { Post, Site } from '@prisma/client';
import type { Editor as CoreEditor } from '@tiptap/core';

import { useCallback, useEffect, useRef, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { WebSocketStatus } from '@hocuspocus/provider';
import DOMPurify from 'isomorphic-dompurify';

import { Button } from '@av/ui/button';
import { Card, CardContent, CardHeader } from '@av/ui/card';
import { Icons } from '@av/ui/icons';
import { toast } from '@av/ui/use-toast';
import { APP_BP } from '@av/utils';

import type { EditorUser } from './types';

import { updateCollabPost } from '#/lib/actions/publish/publish-actions';
import { usePostContentStore } from '#/lib/store/use-post-content';

import { ConfirmPublishModal } from '#/components/modals/confirm-publish-modal';
import EditorIpStatusIndicator from '#/components/tiptap/block-editor/editor-ip-status-indicator';

import { useAiContentPercentage } from '#/hooks/use-ai-content-percentage';

import { EditorInfo } from './editor-info';
import { TableOfContents } from './table-of-contents';

interface CharacterCount {
  characters: () => number;
  words: () => number;
}

interface AiEditorWidgetProps {
  characterCount: CharacterCount;
  collabState: WebSocketStatus;
  displayedUsers: EditorUser[];
  editor: CoreEditor;
  post: Post & { site: Site };
  teamSlug: string;
}

const AiEditorWidget = ({
  characterCount,
  collabState,
  displayedUsers,
  editor,
  post,
  teamSlug,
}: AiEditorWidgetProps) => {
  const isFirstLoad = useRef(true);
  const initialCharacterCountValue = editor.storage.characterCount.characters();
  const initialCharacterCount =
    initialCharacterCountValue !== 0 ? initialCharacterCountValue : 0;
  const characterCountRef = useRef(initialCharacterCount);

  const {
    aiContentPercentage: calculatedAiContentPercentage,
    handleContentChange,
  } = useAiContentPercentage(characterCountRef.current, post.id);

  const aiContentPercentage =
    collabState === WebSocketStatus.Connected
      ? calculatedAiContentPercentage
      : 0;

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const updateCharacterCount = () => {
      const newCharacterCount = editor.storage.characterCount.characters();
      characterCountRef.current = newCharacterCount;
      handleContentChange(newCharacterCount);
    };

    const subscribeToUpdate = () => {
      editor.on('update', updateCharacterCount);
      isFirstLoad.current = false;
    };

    if (isFirstLoad.current) {
      timeoutId = setTimeout(subscribeToUpdate, 5000);
    } else {
      subscribeToUpdate();
    }

    return () => {
      clearTimeout(timeoutId);
      editor.off('update', updateCharacterCount);
    };
  }, [editor, handleContentChange]);

  const setHtmlContent = usePostContentStore((state) => state.setHtmlContent);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handlePublish = useCallback(() => {
    const htmlContent = editor.getHTML();
    const sanitizedHtmlContent = DOMPurify.sanitize(htmlContent);
    setHtmlContent(sanitizedHtmlContent);
    // console.log('Updated HTML content in store:', usePostContentStore.getState().htmlContent);
    router.push(
      `${APP_BP}/${teamSlug}/workspace/publish/post/${post.id}/publish`,
    );
  }, [editor, setHtmlContent, router, teamSlug, post.id]);

  const handleUpdate = useCallback(() => {
    startTransition(async () => {
      const htmlContent = editor.getHTML();
      const sanitizedHtmlContent = DOMPurify.sanitize(htmlContent);

      const formData = new FormData();
      formData.append('content', sanitizedHtmlContent);

      if (!post.site) {
        toast({
          title: 'Error',
          description: 'Post must have an associated site.',
          variant: 'destructive',
        });
        // eslint-disable-next-line no-console
        console.error('Post must have an associated site.');
        return;
      }

      try {
        const result = await updateCollabPost(formData, post);

        if (result.error) {
          toast({
            title: 'Error',
            description: result.error,
            variant: 'destructive',
          });
          // eslint-disable-next-line no-console
          console.error(result.error);
        } else {
          toast({
            title: 'Success, it worked!',
            description: 'Your post has been updated.',
            variant: 'success',
          });
        }
      } catch (error: unknown) {
        let message = 'An unexpected error occurred.';
        if (error instanceof Error) {
          message = error.message;
        }

        toast({
          title: 'Unexpected Error',
          description: message,
          variant: 'destructive',
        });
        // eslint-disable-next-line no-console
        console.error(error);
      }
    });
  }, [editor, post]);

  return (
    <div className="py-10">
      <Card>
        <CardHeader className="space-y-1">
          <EditorInfo
            characters={characterCount.characters()}
            words={characterCount.words()}
            collabState={collabState}
            users={displayedUsers}
          />
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-2 gap-6">
            <EditorIpStatusIndicator
              aiContentPercentage={aiContentPercentage}
            />
            {!post.published ? (
              <ConfirmPublishModal onConfirm={handlePublish}>
                <Button disabled={isPending}>
                  {isPending ? (
                    <>
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Publish'
                  )}
                </Button>
              </ConfirmPublishModal>
            ) : (
              <ConfirmPublishModal isUpdate onConfirm={handleUpdate}>
                <Button disabled={isPending}>
                  {isPending ? (
                    <>
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    'Update'
                  )}
                </Button>
              </ConfirmPublishModal>
            )}
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Table of contents
              </span>
            </div>
          </div>
          <div className="grid gap-2">
            <TableOfContents editor={editor} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AiEditorWidget;
