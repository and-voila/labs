import { cn } from '@av/ui';
import { Icons } from '@av/ui/icons';

interface LogoLoaderProps {
  className?: string;
}

const LogoLoader: React.FC<LogoLoaderProps> = ({ className }) => {
  return (
    <div className={cn('flex w-full items-center justify-center', className)}>
      <div className="animate-pulse">
        <Icons.logo className="h-24 w-24 text-primary" />
      </div>
    </div>
  );
};

export default LogoLoader;
