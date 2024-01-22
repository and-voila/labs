import { Icons } from '#/components/shared/icons';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container relative grid min-h-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary to-violet-950" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Icons.logo className="h-12 w-12 text-primary-foreground" />
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;The future belongs to a different kind of person with a
              different kind of mind: artists, inventors, storytellers—creative
              and holistic right-brain thinkers.&rdquo;
            </p>
            <footer className="text-sm">Daniel Pink</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">{children}</div>
    </div>
  );
};

export default AuthLayout;
