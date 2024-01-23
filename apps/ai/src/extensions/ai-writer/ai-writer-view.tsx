import type { Tone } from '@tiptap-pro/extension-ai';
import type { Extension, NodeViewWrapperProps } from '@tiptap/react';
import type { AiToneOption } from '#/components/tiptap/block-editor/types';

import { useCallback, useMemo, useState } from 'react';
import * as Dropdown from '@radix-ui/react-dropdown-menu';
import { NodeViewWrapper } from '@tiptap/react';
import toast from 'react-hot-toast';
import { v4 as uuid } from 'uuid';

import { tones } from '#/lib/tiptap/constants';

import { DropdownButton } from '#/components/tiptap/dropdown';
import { Button } from '#/components/tiptap/editor-button';
import { Icon } from '#/components/tiptap/icon';
import { Loader } from '#/components/tiptap/loader';
import { Panel, PanelHeadline } from '#/components/tiptap/panel';
import { Surface } from '#/components/tiptap/surface';
import { Textarea } from '#/components/tiptap/textarea';
import { Toolbar } from '#/components/tiptap/toolbar';

export interface DataProps {
  text: string;
  addHeading: boolean;
  tone?: Tone;
  textUnit?: string;
  textLength?: string;
  language?: string;
}

export const AiWriterView = ({
  editor,
  node,
  getPos,
  deleteNode,
}: NodeViewWrapperProps) => {
  const aiOptions = editor.extensionManager.extensions.find(
    (ext: Extension) => ext.name === 'ai',
  ).options;

  const [data, setData] = useState<DataProps>({
    text: '',
    tone: undefined,
    textLength: undefined,
    addHeading: false,
    language: undefined,
  });
  const currentTone = tones.find((t) => t.value === data.tone);
  const [previewText, setPreviewText] = useState(undefined);
  const [isFetching, setIsFetching] = useState(false);
  const textareaId = useMemo(() => uuid(), []);

  const generateText = useCallback(async () => {
    const {
      text: dataText,
      tone,
      textLength,
      textUnit,
      addHeading,
      language,
    } = data;

    if (!data.text) {
      toast.error('Please enter a description');

      return;
    }

    setIsFetching(true);

    const payload = {
      text: dataText,
      textLength: textLength,
      textUnit: textUnit,
      useHeading: addHeading,
      tone,
      language,
    };

    try {
      // TODO: Streaming
      // const response = await fetch(`${env.NEXT_PUBLIC_TIPTAP_AI_BASE_URL}/text/complete?stream=1` || '', {
      //   method: 'POST',
      //   headers: {
      //     accept: 'application/json',
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(payload),
      // })

      // const data = response?.body

      // if (!data) {
      //   return
      // }

      // const reader = data.getReader()
      // const decoder: TextDecoder = new TextDecoder()
      // let done = false
      // let tokens: string = ''

      // while (!done) {
      //   const { value, done: doneReading } = await reader.read()
      //   const decodedText = decoder.decode(value, { stream: true })

      //   console.log(decodedText)

      //   tokens += decodedText

      //   setPreviewText(tokens)

      //   done = doneReading
      // }

      // setIsFetching(!done)

      // return

      const { baseUrl, appId, token } = aiOptions;
      const response = await fetch(`${baseUrl}/text/prompt`, {
        method: 'POST',
        headers: {
          accept: 'application.json',
          'Content-Type': 'application/json',
          'X-App-Id': appId.trim(),
          Authorization: `Bearer ${token.trim()}`,
        },
        body: JSON.stringify(payload),
      });

      const json = await response.json();
      const text = json.response;

      if (!text.length) {
        setIsFetching(false);

        return;
      }

      setPreviewText(text);

      setIsFetching(false);
      // TODO:
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (errPayload: any) {
      const errorMessage = errPayload?.response?.data?.error;
      const message =
        errorMessage !== 'An error occurred'
          ? `An error has occured: ${errorMessage}`
          : errorMessage;

      setIsFetching(false);
      toast.error(message);
    }
  }, [data, aiOptions]);

  const insert = useCallback(() => {
    const from = getPos();
    const to = from + node.nodeSize;

    editor.chain().focus().insertContentAt({ from, to }, previewText).run();
  }, [editor, previewText, getPos, node.nodeSize]);

  const discard = useCallback(() => {
    deleteNode();
  }, [deleteNode]);

  const onTextAreaChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setData((prevData) => ({ ...prevData, text: e.target.value }));
    },
    [],
  );

  const onUndoClick = useCallback(() => {
    setData((prevData) => ({ ...prevData, tone: undefined }));
  }, []);

  const createItemClickHandler = useCallback((tone: AiToneOption) => {
    return () => {
      setData((prevData) => ({ ...prevData, tone: tone.value }));
    };
  }, []);

  return (
    <NodeViewWrapper data-drag-handle>
      <Panel noShadow className="w-full">
        <div className="flex flex-col p-1">
          {isFetching && <Loader label="AI is now doing its job!" />}
          {previewText && (
            <>
              <PanelHeadline>Preview</PanelHeadline>
              <div
                className="relative mb-4 ml-2.5 max-h-[14rem] overflow-y-auto border-l-4 bg-card px-4 text-base text-foreground"
                dangerouslySetInnerHTML={{ __html: previewText }}
              />
            </>
          )}
          <div className="flex flex-row items-center justify-between gap-1">
            <PanelHeadline asChild>
              <label htmlFor={textareaId}>Prompt</label>
            </PanelHeadline>
          </div>
          <Textarea
            id={textareaId}
            value={data.text}
            onChange={onTextAreaChange}
            placeholder={'Tell me what you want me to write about.'}
            required
            className="mb-2"
          />
          <div className="flex flex-row items-center justify-between gap-1">
            <div className="flex w-auto justify-between gap-1">
              <Dropdown.Root>
                <Dropdown.Trigger asChild>
                  <Button variant="tertiary">
                    <Icon name="Mic" />
                    {currentTone?.label ?? 'Change tone'}
                    <Icon name="ChevronDown" />
                  </Button>
                </Dropdown.Trigger>
                <Dropdown.Portal>
                  <Dropdown.Content side="bottom" align="start" asChild>
                    <Surface className="min-w-[12rem] p-2">
                      {!!data.tone && (
                        <>
                          <Dropdown.Item asChild>
                            <DropdownButton
                              isActive={data.tone === undefined}
                              onClick={onUndoClick}
                            >
                              <Icon name="Undo2" />
                              Reset
                            </DropdownButton>
                          </Dropdown.Item>
                          <Toolbar.Divider horizontal />
                        </>
                      )}
                      {tones.map((tone) => (
                        <Dropdown.Item asChild key={tone.value}>
                          <DropdownButton
                            isActive={tone.value === data.tone}
                            onClick={createItemClickHandler(tone)}
                          >
                            {tone.label}
                          </DropdownButton>
                        </Dropdown.Item>
                      ))}
                    </Surface>
                  </Dropdown.Content>
                </Dropdown.Portal>
              </Dropdown.Root>
            </div>
            <div className="my-2 flex w-auto justify-between gap-1">
              {previewText && (
                <Button
                  variant="ghost"
                  className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  onClick={discard}
                >
                  <Icon name="Trash" />
                  Discard
                </Button>
              )}
              {previewText && (
                <Button
                  variant="ghost"
                  onClick={insert}
                  disabled={!previewText}
                >
                  <Icon name="Check" />
                  Insert
                </Button>
              )}
              <Button
                variant="primary"
                onClick={generateText}
                style={{ whiteSpace: 'nowrap' }}
              >
                {previewText ? (
                  <Icon name="Repeat" />
                ) : (
                  <Icon name="Sparkles" />
                )}
                {previewText ? 'Regenerate' : 'Generate text'}
              </Button>
            </div>
          </div>
        </div>
      </Panel>
    </NodeViewWrapper>
  );
};
