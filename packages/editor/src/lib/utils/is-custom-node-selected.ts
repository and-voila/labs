import type { Editor } from '@tiptap/react';

import CodeBlock from '@tiptap/extension-code-block';

import AiImage from '#editor/components/ai-image/ai-image';
import AiWriter from '#editor/components/ai-writer/ai-writer';
import { TableOfContentNode } from '#editor/components/table-of-content-node';
import Figcaption from '#editor/extensions/figcaption';
import HorizontalRule from '#editor/extensions/horizontal-rule';
import ImageBlock from '#editor/extensions/image-block';
import ImageUpload from '#editor/extensions/image-upload';
import Link from '#editor/extensions/link';

export const isTableGripSelected = (node: HTMLElement) => {
  let container = node;

  while (container && !['TD', 'TH'].includes(container.tagName)) {
    container = container.parentElement!;
  }

  const gripColumn = container?.querySelector?.('a.grip-column.selected');
  const gripRow = container?.querySelector?.('a.grip-row.selected');

  if (gripColumn ?? gripRow) {
    return true;
  }

  return false;
};

export const isCustomNodeSelected = (editor: Editor, node: HTMLElement) => {
  const customNodes = [
    // EmbedInput.name,
    HorizontalRule.name,
    ImageBlock.name,
    ImageUpload.name,
    CodeBlock.name,
    ImageBlock.name,
    Link.name,
    AiWriter.name,
    AiImage.name,
    Figcaption.name,
    TableOfContentNode.name,
  ];

  return (
    customNodes.some((type) => editor.isActive(type)) ||
    isTableGripSelected(node)
  );
};

export default isCustomNodeSelected;
