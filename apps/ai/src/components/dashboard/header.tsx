interface DashboardHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function DashboardHeader({
  title,
  description,
  children,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
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
      {children && (
        <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row">
          {children}
        </div>
      )}
    </div>
  );
}
