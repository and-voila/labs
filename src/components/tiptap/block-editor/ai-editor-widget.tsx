import { WebSocketStatus } from '@hocuspocus/provider';
import { Editor as CoreEditor } from '@tiptap/core';

import { EditorState } from '#/components/publish/editor/editor';
import EditorIpStatusIndicator from '#/components/publish/editor/editor-ip-status-indicator';
import EditorPublishButton from '#/components/publish/editor/editor-publish-button';
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
}

const AiEditorWidget = ({
  characterCount,
  collabState,
  displayedUsers,
  editor,
}: AiEditorWidgetProps) => {
  // Mock aiContentPercentage
  const aiContentPercentage = 50;

  // Mock props for EditorPublishButton
  const isPendingPublishing = false;
  const isPublishable = true;
  const published = false;
  const postId = 'mockPostId';
  const dispatch = () => {};
  const state: EditorState = {
    data: {
      id: 'mockId',
      createdAt: new Date(),
      updatedAt: new Date(),
      title: 'mockTitle',
      description: 'mockDescription',
      content: 'mockContent',
      slug: 'mockSlug',
      image: 'mockImageUrl',
      imageBlurhash: 'mockImageBlurhash',
      published: false,
      userId: 'mockUserId',
      teamId: 'mockTeamId',
      siteId: 'mockSiteId',
      site: {
        subdomain: 'mockSubdomain',
      },
    },
    titleError: '',
    descriptionError: '',
    contentError: '',
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const startTransitionPublishing = (_: () => Promise<void>) => {};
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
            <EditorPublishButton
              isPendingPublishing={isPendingPublishing}
              isPublishable={isPublishable}
              published={published}
              // eslint-disable-next-line react/jsx-no-bind
              startTransitionPublishing={startTransitionPublishing}
              postId={postId}
              // eslint-disable-next-line react/jsx-no-bind
              dispatch={dispatch}
              state={state}
            />
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
