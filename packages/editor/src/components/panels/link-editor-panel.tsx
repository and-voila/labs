import { useCallback, useMemo, useState } from 'react';

import { Button } from '../editor-button';
import { Icon } from '../icon';
import { Surface } from '../surface';
import { Toggle } from '../toggle';

export interface LinkEditorPanelProps {
  initialUrl?: string;
  initialOpenInNewTab?: boolean;
  onSetLink: (url: string, openInNewTab?: boolean) => void;
}

export const useLinkEditorState = ({
  initialUrl,
  initialOpenInNewTab,
  onSetLink,
}: LinkEditorPanelProps) => {
  const [url, setUrl] = useState(initialUrl ?? '');
  const [openInNewTab, setOpenInNewTab] = useState(
    initialOpenInNewTab ?? false,
  );

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  }, []);

  const isValidUrl = useMemo(() => /^(\S+):(\/\/)?\S+$/.test(url), [url]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (isValidUrl) {
        onSetLink(url, openInNewTab);
      }
    },
    [url, isValidUrl, openInNewTab, onSetLink],
  );

  return {
    url,
    setUrl,
    openInNewTab,
    setOpenInNewTab,
    onChange,
    handleSubmit,
    isValidUrl,
  };
};

export const LinkEditorPanel = ({
  onSetLink,
  initialOpenInNewTab,
  initialUrl,
}: LinkEditorPanelProps) => {
  const state = useLinkEditorState({
    onSetLink,
    initialOpenInNewTab,
    initialUrl,
  });

  return (
    <Surface className="p-2">
      <form onSubmit={state.handleSubmit} className="flex items-center gap-2">
        {/* TODO: Review this control */}
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className="flex cursor-text items-center gap-2 rounded-lg bg-background p-2">
          <Icon name="Link" className="flex-none text-primary" />
          <input
            type="url"
            className="min-w-[12rem] flex-1 bg-transparent text-sm text-foreground outline-none"
            placeholder="Enter URL"
            value={state.url}
            onChange={state.onChange}
          />
        </label>
        <Button
          variant="primary"
          buttonSize="small"
          type="submit"
          disabled={!state.isValidUrl}
        >
          Set Link
        </Button>
      </form>
      <div className="mt-3">
        {/* TODO: Review this control too */}
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className="flex cursor-pointer select-none items-center justify-start gap-2 text-sm text-muted-foreground">
          Open in new tab
          <Toggle
            active={state.openInNewTab}
            onChange={state.setOpenInNewTab}
          />
        </label>
      </div>
    </Surface>
  );
};
