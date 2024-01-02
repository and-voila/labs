import * as Popover from '@radix-ui/react-popover';

import { LinkEditorPanel } from '#/components/tiptap/panels/link-editor-panel';
import { Icon } from '#/components/tiptap/ui/icon';
import { Toolbar } from '#/components/tiptap/ui/toolbar';

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
