import { Editor } from '@tiptap/react';

import {
  AiImage,
  AiWriter,
  CodeBlock,
  // EmbedInput,
  Figcaption,
  HorizontalRule,
  ImageBlock,
  ImageUpload,
  Link,
} from '#/extensions';
import { TableOfContentNode } from '#/extensions/table-of-content-node';

export const isTableGripSelected = (node: HTMLElement) => {
  let container = node;

  while (container && !['TD', 'TH'].includes(container.tagName)) {
    container = container.parentElement!;
  }

  const gripColumn =
    container &&
    container.querySelector &&
    container.querySelector('a.grip-column.selected');
  const gripRow =
    container &&
    container.querySelector &&
    container.querySelector('a.grip-row.selected');

  if (gripColumn || gripRow) {
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
