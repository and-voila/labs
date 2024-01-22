import { useCallback, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

import { themeColors } from '#/lib/tiptap/constants';

import { Icon } from '#/components/tiptap/icon';
import { Toolbar } from '#/components/tiptap/toolbar';

import { ColorButton } from './color-button';

export interface ColorPickerProps {
  color?: string;
  onChange?: (color: string) => void;
  onClear?: () => void;
}

export const ColorPicker = ({ color, onChange, onClear }: ColorPickerProps) => {
  const [colorInputValue, setColorInputValue] = useState(color ?? '');

  const handleColorUpdate = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setColorInputValue(event.target.value);
    },
    [],
  );

  const handleColorChange = useCallback(() => {
    const isCorrectColor = /^#([0-9A-F]{3}){1,2}$/i.test(colorInputValue);

    if (!isCorrectColor) {
      if (onChange) {
        onChange('');
      }

      return;
    }

    if (onChange) {
      onChange(colorInputValue);
    }
  }, [colorInputValue, onChange]);

  return (
    <div className="flex flex-col gap-2">
      <HexColorPicker
        className="w-full"
        color={color ?? ''}
        onChange={onChange}
      />
      <input
        type="text"
        className="w-full rounded border bg-background p-2 text-foreground focus:outline-none focus:outline-0 focus:ring-1"
        placeholder="#6F44EE"
        value={colorInputValue}
        onChange={handleColorUpdate}
        onBlur={handleColorChange}
      />
      <div className="flex max-w-[15rem] flex-wrap items-center gap-1">
        {themeColors.map((currentColor) => (
          <ColorButton
            active={currentColor === color}
            color={currentColor}
            key={currentColor}
            onColorChange={onChange}
          />
        ))}
        <Toolbar.Button tooltip="Reset color to default" onClick={onClear}>
          <Icon name="Undo" />
        </Toolbar.Button>
      </div>
    </div>
  );
};
