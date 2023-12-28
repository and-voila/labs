import { Editor } from '@tiptap/react';

export const getRenderContainer = (editor: Editor, nodeType: string) => {
  const {
    view,
    state: {
      selection: { from },
    },
  } = editor;

  const elements = document.querySelectorAll('.has-focus');
  const elementCount = elements.length;
  const innermostNode = elements[elementCount - 1];
  const element = innermostNode;

  if (
    (element &&
      element.getAttribute('data-type') &&
      element.getAttribute('data-type') === nodeType) ||
    (element && element.classList && element.classList.contains(nodeType))
  ) {
    return element;
  }

  const node = view.domAtPos(from).node as HTMLElement;
  let container = node;

  if (!container.tagName) {
    // @ts-expect-error TODO:
    container = node.parentElement;
  }

  while (
    container &&
    !(
      container.getAttribute('data-type') &&
      container.getAttribute('data-type') === nodeType
    ) &&
    !container.classList.contains(nodeType)
  ) {
    // @ts-expect-error TODO:
    container = container.parentElement;
  }

  return container;
};

export default getRenderContainer;
