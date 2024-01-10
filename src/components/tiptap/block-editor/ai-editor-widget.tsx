import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { WebSocketStatus } from '@hocuspocus/provider';
import { Editor as CoreEditor } from '@tiptap/core';
import DOMPurify from 'isomorphic-dompurify';

import { APP_BP } from '#/lib/const';
import { usePostContentStore } from '#/lib/store/use-post-content';

import { ConfirmPublishModal } from '#/components/modals/confirm-publish-modal';
import { PostWithSite } from '#/components/publish/editor/editor';
import EditorIpStatusIndicator from '#/components/publish/editor/editor-ip-status-indicator';
import { Icons } from '#/components/shared/icons';
import { Button } from '#/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '#/components/ui/card';

import { EditorInfo } from './editor-info';
import { TableOfContents } from './table-of-contents';
import { EditorUser } from './types';

interface CharacterCount {
  characters: () => number;
  words: () => number;
}

interface AiEditorWidgetProps {
  characterCount: CharacterCount;
  collabState: WebSocketStatus;
  displayedUsers: EditorUser[];
  editor: CoreEditor;
  post: PostWithSite;
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
  const setHtmlContent = usePostContentStore((state) => state.setHtmlContent);
  const [isPublishing, setIsPublishing] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (
      pathname ===
      `${APP_BP}/${teamSlug}/workspace/publish/post/${post.id}/publish`
    ) {
      setIsPublishing(false);
    }
  }, [pathname, teamSlug, post.id]);

  const handleConfirm = useCallback(() => {
    const htmlContent = editor.getHTML();
    const sanitizedHtmlContent = DOMPurify.sanitize(htmlContent);
    setHtmlContent(sanitizedHtmlContent);
    // console.log('Updated HTML content in store:', usePostContentStore.getState().htmlContent);
    router.push(
      `${APP_BP}/${teamSlug}/workspace/publish/post/${post.id}/publish`,
    );
  }, [editor, setHtmlContent, router, teamSlug, post.id]);
  // Mock aiContentPercentage
  const aiContentPercentage = 10;

  return (
    <div className="py-10">
      <Card>
        <CardHeader className="space-y-1">
          <CardDescription>
            <EditorInfo
              characters={characterCount.characters()}
              words={characterCount.words()}
              collabState={collabState}
              users={displayedUsers}
            />
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-2 gap-6">
            <EditorIpStatusIndicator
              aiContentPercentage={aiContentPercentage}
            />
            <ConfirmPublishModal onConfirm={handleConfirm}>
              <Button disabled={isPublishing}>
                {isPublishing ? (
                  <>
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Publish'
                )}
              </Button>
            </ConfirmPublishModal>
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
