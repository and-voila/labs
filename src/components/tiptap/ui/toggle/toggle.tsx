import { useCallback } from 'react';

import { cn } from '#/lib/tiptap/utils';

export type ToggleProps = {
  active?: boolean;
  onChange: (active: boolean) => void;
  size?: 'small' | 'large';
};

export const Toggle = ({
  onChange,
  active = false,
  size = 'large',
}: ToggleProps) => {
  const state = active ? 'checked' : 'unchecked';
  const value = active ? 'on' : 'off';

  const buttonClass = cn(
    'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
    active
      ? 'data-[state=checked]:bg-primary'
      : 'data-[state=unchecked]:bg-input',
    size === 'small' && 'h-3 w-6 px-0.5',
    size === 'large' && 'h-5 w-9 px-0.5',
  );

  const pinClass = cn(
    'pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform',
    size === 'small' && 'h-2 w-2',
    size === 'large' && 'h-4 w-4',
    active
      ? cn(
          size === 'small' ? 'translate-x-3' : '',
          size === 'large' ? 'translate-x-4' : '',
        )
      : 'translate-x-0',
  );

  const handleChange = useCallback(() => {
    onChange(!active);
  }, [active, onChange]);

  return (
    <button
      className={buttonClass}
      type="button"
      role="switch"
      aria-checked={active}
      data-state={state}
      value={value}
      onClick={handleChange}
    >
      <span className={pinClass} data-state={state} />
    </button>
  );
};
