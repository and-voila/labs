import { cn } from '@av/ui';

export const DropdownCategoryTitle = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="mb-1 px-1.5 text-[.65rem] font-semibold uppercase text-muted-foreground">
      {children}
    </div>
  );
};

export const DropdownButton = ({
  children,
  isActive,
  onClick,
  disabled,
  className,
}: {
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) => {
  const buttonClass = cn(
    'flex w-full items-center gap-2 rounded bg-transparent p-1.5 text-left text-sm font-medium text-muted-foreground',
    !isActive && !disabled,
    'hover:bg-secondary hover:text-foreground',
    isActive && !disabled && 'bg-secondary text-foreground',
    disabled && 'cursor-not-allowed text-muted-foreground/80',
    className,
  );

  return (
    <button className={buttonClass} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};
