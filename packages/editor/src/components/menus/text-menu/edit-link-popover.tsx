import * as Popover from '@radix-ui/react-popover';

import { Icon } from '#editor/components/icon';
import { LinkEditorPanel } from '#editor/components/panels/link-editor-panel';
import { Toolbar } from '#editor/components/toolbar';

export interface EditLinkPopoverProps {
  onSetLink: (link: string, openInNewTab?: boolean) => void;
}

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
