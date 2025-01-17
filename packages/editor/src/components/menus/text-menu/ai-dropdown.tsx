import type { Tone } from '@tiptap-pro/extension-ai';

import { useCallback } from 'react';
import * as Dropdown from '@radix-ui/react-dropdown-menu';

import { DropdownButton } from '#editor/components/dropdown';
import { Icon } from '#editor/components/icon';
import { Surface } from '#editor/components/surface';
import { Toolbar } from '#editor/components/toolbar';
import { languages, tones } from '#editor/lib/constants';

export interface AIDropdownProps {
  onSimplify: () => void;
  onFixSpelling: () => void;
  onMakeShorter: () => void;
  onMakeLonger: () => void;
  onEmojify: () => void;
  onTldr: () => void;
  onTranslate: (language: string) => void;
  onTone: (tone: Tone) => void;
  onCompleteSentence: () => void;
}

export const AIDropdown = ({
  onCompleteSentence,
  onEmojify,
  onFixSpelling,
  onMakeLonger,
  onMakeShorter,
  onSimplify,
  onTldr,
  onTone,
  onTranslate,
}: AIDropdownProps) => {
  const handleTone = useCallback((tone: Tone) => () => onTone(tone), [onTone]);
  const handleTranslate = useCallback(
    (language: string) => () => onTranslate(language),
    [onTranslate],
  );

  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>
        <Toolbar.Button
          className="text-alternate hover:text-alternate/80 active:text-alternate"
          activeClassname="text-alternate/80 hover:text-alternate"
        >
          <Icon name="Bot" className="mr-1" />
          AI Assist
          <Icon name="ChevronDown" className="ml-1 h-2 w-2" />
        </Toolbar.Button>
      </Dropdown.Trigger>
      <Dropdown.Content asChild>
        <Surface className="min-w-[10rem] p-2">
          <Dropdown.Item onClick={onSimplify}>
            <DropdownButton>
              <Icon name="CircleSlash" />
              Simplify
            </DropdownButton>
          </Dropdown.Item>
          <Dropdown.Item onClick={onFixSpelling}>
            <DropdownButton>
              <Icon name="Eraser" />
              Proofread
            </DropdownButton>
          </Dropdown.Item>
          <Dropdown.Item onClick={onMakeShorter}>
            <DropdownButton>
              <Icon name="ArrowLeftToLine" />
              Shorten
            </DropdownButton>
          </Dropdown.Item>
          <Dropdown.Item onClick={onMakeLonger}>
            <DropdownButton>
              <Icon name="ArrowRightToLine" />
              Extend
            </DropdownButton>
          </Dropdown.Item>
          <Dropdown.Sub>
            <Dropdown.SubTrigger>
              <DropdownButton>
                <Icon name="Mic" />
                Change tone
                <Icon name="ChevronRight" className="ml-auto h-4 w-4" />
              </DropdownButton>
            </Dropdown.SubTrigger>
            <Dropdown.SubContent>
              <Surface className="flex max-h-[20rem] min-w-[15rem] flex-col overflow-auto p-2">
                {tones.map((tone) => (
                  <Dropdown.Item
                    onClick={handleTone(tone.value as Tone)}
                    key={tone.value}
                  >
                    <DropdownButton>{tone.label}</DropdownButton>
                  </Dropdown.Item>
                ))}
              </Surface>
            </Dropdown.SubContent>
          </Dropdown.Sub>
          <Dropdown.Item onClick={onTldr}>
            <DropdownButton>
              <Icon name="MoreHorizontal" />
              Summarize
            </DropdownButton>
          </Dropdown.Item>
          <Dropdown.Item onClick={onEmojify}>
            <DropdownButton>
              <Icon name="SmilePlus" />
              Emojify
            </DropdownButton>
          </Dropdown.Item>
          <Dropdown.Sub>
            <Dropdown.SubTrigger>
              <DropdownButton>
                <Icon name="Languages" />
                Translate
                <Icon name="ChevronRight" className="ml-auto h-4 w-4" />
              </DropdownButton>
            </Dropdown.SubTrigger>
            <Dropdown.SubContent>
              <Surface className="flex max-h-[20rem] min-w-[15rem] flex-col overflow-auto p-2">
                {languages.map((lang) => (
                  <Dropdown.Item
                    onClick={handleTranslate(lang.value)}
                    key={lang.value}
                  >
                    <DropdownButton>{lang.label}</DropdownButton>
                  </Dropdown.Item>
                ))}
              </Surface>
            </Dropdown.SubContent>
          </Dropdown.Sub>
          <Dropdown.Item onClick={onCompleteSentence}>
            <DropdownButton>
              <Icon name="PenLine" />
              Finish Sentence
            </DropdownButton>
          </Dropdown.Item>
        </Surface>
      </Dropdown.Content>
    </Dropdown.Root>
  );
};
