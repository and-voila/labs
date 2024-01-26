import { Icon } from '#editor/components/icon';
import { Surface } from '#editor/components/surface';
import { Toolbar } from '#editor/components/toolbar';
import Tooltip from '#editor/components/tooltip';

export interface LinkPreviewPanelProps {
  url: string;
  onEdit: () => void;
  onClear: () => void;
}

export const LinkPreviewPanel = ({
  onClear,
  onEdit,
  url,
}: LinkPreviewPanelProps) => {
  return (
    <Surface className="flex items-center gap-2 p-2">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mx-2 text-sm font-semibold text-primary underline"
      >
        {url}
      </a>
      <Toolbar.Divider />
      <Tooltip title="Edit link">
        <Toolbar.Button onClick={onEdit}>
          <Icon name="Pen" />
        </Toolbar.Button>
      </Tooltip>
      <Tooltip title="Remove link">
        <Toolbar.Button onClick={onClear}>
          <Icon name="Trash2" />
        </Toolbar.Button>
      </Tooltip>
    </Surface>
  );
};
