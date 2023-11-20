interface DashboardHeaderProps {
  heading: string;
  text?: string;
  children?: React.ReactNode;
}

export function DashboardHeader({
  heading,
  text,
  children,
}: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="grid gap-1">
        <h1 className="max-w-4xl text-3xl font-bold md:text-4xl">{heading}</h1>
        {text && (
          <p className="max-w-2xl text-base text-muted-foreground lg:text-lg">
            {text}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}
