export interface SubPageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export const SubPageHeader: React.FC<SubPageHeaderProps> = (props) => {
  const { children, title, description } = props;

  return (
    <div className="flex items-center justify-between">
      <div className="grid gap-1">
        <h2 className="max-w-4xl truncate text-2xl font-bold md:text-3xl">
          {title}
        </h2>
        {description && (
          <p className="max-w-2xl text-base text-muted-foreground lg:text-lg">
            {description}
          </p>
        )}
      </div>
      {children && <div className="flex flex-row gap-2">{children}</div>}
    </div>
  );
};
