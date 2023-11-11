interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex h-full items-center justify-center bg-background dark:bg-[#242629]">
      {children}
    </div>
  );
}
