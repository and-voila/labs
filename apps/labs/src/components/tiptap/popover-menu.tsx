import { forwardRef } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { icons } from 'lucide-react';

import { cn } from '@and-voila/ui';

import { Surface } from './surface';
import { Toolbar } from './toolbar';

export const Trigger = Popover.Trigger;
export const Portal = Popover.Portal;

export interface MenuProps {
  children: React.ReactNode;
  trigger: React.ReactNode;
  triggerClassName?: string;
  customTrigger?: boolean;
  isOpen?: boolean;
  onOpenChange?: (state: boolean) => void;
  withPortal?: boolean;
  tooltip?: string;
  isActive?: boolean;
}

export const Menu = ({
  customTrigger,
  trigger,
  triggerClassName,
  children,
  isOpen,
  withPortal,
  tooltip,
  onOpenChange,
}: MenuProps) => {
  return (
    <Popover.Root onOpenChange={onOpenChange}>
      {customTrigger ? (
        <Trigger asChild>{trigger}</Trigger>
      ) : (
        <Trigger asChild>
          <Toolbar.Button
            className={triggerClassName}
            tooltip={!isOpen ? tooltip : ''}
          >
            {trigger}
          </Toolbar.Button>
        </Trigger>
      )}
      {withPortal ? (
        <Popover.Portal>
          <Popover.Content asChild sideOffset={8}>
            <Surface className="z-[9999] flex max-h-80 min-w-[15rem] flex-col gap-0.5 overflow-auto p-2">
              {children}
            </Surface>
          </Popover.Content>
        </Popover.Portal>
      ) : (
        <Popover.Content asChild sideOffset={8}>
          <Surface className="z-[9999] flex max-h-80 min-w-[15rem] flex-col gap-0.5 overflow-auto p-2">
            {children}
          </Surface>
        </Popover.Content>
      )}
    </Popover.Root>
  );
};

Menu.displayName = 'Menu';

export const Item = ({
  label,
  close = true,
  icon,
  iconComponent,
  disabled,
  onClick,
  isActive,
}: {
  label: string | React.ReactNode;
  icon?: keyof typeof icons;
  iconComponent?: React.ReactNode;
  close?: boolean;
  disabled?: boolean;
  onClick: () => void;
  isActive?: boolean;
}) => {
  const className = cn(
    'flex w-full items-center gap-2 rounded bg-transparent p-1.5 text-left text-sm font-medium text-muted-foreground',
    !isActive && !disabled,
    'hover:bg-secondary hover:text-primary-foreground',
    isActive && !disabled && 'bg-secondary text-primary-foreground',
    disabled && 'cursor-not-allowed text-muted-foreground',
  );

  const IconComponent = icon ? icons[icon] : null;
  const IconCustomComponent = iconComponent ?? null;

  const ItemComponent = close ? Popover.Close : 'button';

  return (
    <ItemComponent className={className} onClick={onClick} disabled={disabled}>
      {IconComponent && <IconComponent className="h-4 w-4" />}
      {IconCustomComponent}
      {label}
    </ItemComponent>
  );
};

export interface CategoryTitle {
  children: React.ReactNode;
}

export const CategoryTitle = ({ children }: CategoryTitle) => {
  return (
    <div className="mb-1.5 mt-4 select-none px-1 text-[0.625rem] font-medium uppercase text-muted-foreground first:mt-1.5">
      {children}
    </div>
  );
};

export const Divider = forwardRef<HTMLHRElement>((props, ref) => {
  return <hr {...props} ref={ref} className="my-1 border" />;
});

Divider.displayName = 'Divider';
