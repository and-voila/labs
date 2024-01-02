import * as Popover from '@radix-ui/react-popover';

import { Icon } from '#/components/tiptap/icon';
import { LinkEditorPanel } from '#/components/tiptap/panels/link-editor-panel';
import { Toolbar } from '#/components/tiptap/toolbar';

export type EditLinkPopoverProps = {
  onSetLink: (link: string, openInNewTab?: boolean) => void;
};

export const EditLinkPopover = ({ onSetLink }: EditLinkPopoverProps) => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Toolbar.Button tooltip="Set Link">
          <Icon name="Link" />
        </Toolbar.Button>
      </Popover.Trigger>
      <Popover.Content>
        <LinkEditorPanel onSetLink={onSetLink} />
      </Popover.Content>
    </Popover.Root>
  );
};
