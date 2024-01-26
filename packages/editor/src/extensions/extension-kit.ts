'use client';

import type { HocuspocusProvider } from '@hocuspocus/provider';

import { Emoji } from '@tiptap-pro/extension-emoji';
import { FileHandler } from '@tiptap-pro/extension-file-handler';
import { TableOfContent } from '@tiptap-pro/extension-table-of-content';
import { CharacterCount } from '@tiptap/extension-character-count';
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import { Color } from '@tiptap/extension-color';
import { Dropcursor } from '@tiptap/extension-dropcursor';
import { FocusClasses as Focus } from '@tiptap/extension-focus';
import { FontFamily } from '@tiptap/extension-font-family';
import { Highlight } from '@tiptap/extension-highlight';
import { Placeholder } from '@tiptap/extension-placeholder';
import { Subscript } from '@tiptap/extension-subscript';
import { Superscript } from '@tiptap/extension-superscript';
import { TaskItem } from '@tiptap/extension-task-item';
import { TaskList } from '@tiptap/extension-task-list';
import { TextAlign } from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import { Typography } from '@tiptap/extension-typography';
import { Underline } from '@tiptap/extension-underline';
import { StarterKit } from '@tiptap/starter-kit';
import { common, createLowlight } from 'lowlight';

import type { EditorUser } from '../types';

import { AiImage } from '../components/ai-image/ai-image';
import { AiWriter } from '../components/ai-writer/ai-writer';
import { TableOfContentNode } from '../components/table-of-content-node';
import { API } from '../lib/api';
import { BlockquoteFigure } from './blockquote-figure/blockquote-figure';
// import { PasteFromGoogleDoc } from './PasteFromGoogleDoc'
import { Document } from './document';
import { emojiSuggestion } from './emoji-suggestion';
// import { EmbedInput } from './EmbedInput'
import { Figcaption } from './figcaption';
import { FontSize } from './font-size';
import { Heading } from './heading';
import { HorizontalRule } from './horizontal-rule';
import { ImageBlock } from './image-block';
import { ImageUpload } from './image-upload';
import { Link } from './link';
import { Column } from './multi-column/column';
import { Columns } from './multi-column/columns';
import { Selection } from './selection';
import { SlashCommand } from './slash-command/slash-command';
import { TableCell } from './table/cell';
import { TableHeader } from './table/header';
import { TableRow } from './table/row';
import { Table } from './table/table';
import { TrailingNode } from './trailing-node';

// import { lowlight } from 'lowlight'; TODO:

const lowlight = createLowlight(common);

interface ExtensionKitProps {
  provider?: HocuspocusProvider | null;
  user?: EditorUser;
}

export const ExtensionKit = ({ provider, user }: ExtensionKitProps) => [
  Document,
  Columns,
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
  AiWriter.configure({
    authorId: user?.id,
    authorName: user?.displayName,
  }),
  AiImage.configure({
    authorId: user?.id,
    authorName: user?.displayName,
  }),
  Column,
  Selection,
  Heading.configure({
    levels: [1, 2, 3, 4, 5, 6],
  }),
  HorizontalRule,
  // EmbedInput,
  StarterKit.configure({
    document: false,
    dropcursor: false,
    heading: false,
    horizontalRule: false,
    blockquote: false,
    history: false,
    codeBlock: false,
  }),
  CodeBlockLowlight.configure({
    lowlight,
    defaultLanguage: null,
  }),
  TextStyle,
  FontSize,
  FontFamily,
  Color,
  TrailingNode,
  Link.configure({
    openOnClick: false,
  }),
  Highlight.configure({ multicolor: true }),
  Underline,
  CharacterCount.configure({ limit: 50000 }),
  TableOfContent,
  TableOfContentNode,
  ImageUpload.configure({
    clientId: provider?.document?.clientID,
  }),
  ImageBlock,
  FileHandler.configure({
    allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
    onDrop: (currentEditor, files, pos) => {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      files.forEach(async () => {
        const url = await API.uploadImage();

        currentEditor.chain().setImageBlockAt({ pos, src: url }).focus().run();
      });
    },
    onPaste: (currentEditor, files) => {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      files.forEach(async () => {
        const url = await API.uploadImage();

        return currentEditor
          .chain()
          .setImageBlockAt({
            pos: currentEditor.state.selection.anchor,
            src: url,
          })
          .focus()
          .run();
      });
    },
  }),
  Emoji.configure({
    enableEmoticons: true,
    suggestion: emojiSuggestion,
  }),
  TextAlign.extend({
    addKeyboardShortcuts() {
      return {};
    },
  }).configure({
    types: ['heading', 'paragraph'],
  }),
  Subscript,
  Superscript,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  Typography,
  Placeholder.configure({
    includeChildren: true,
    showOnlyCurrent: false,
    placeholder: () => '',
  }),
  SlashCommand,

  Focus,
  Figcaption,
  BlockquoteFigure,
  Dropcursor.configure({
    width: 2,
    class: 'ProseMirror-dropcursor border-black',
  }),
];

export default ExtensionKit;
