import { Progress } from '@/app/components/ui/progress';
import { cn } from '@/app/lib/utils';

interface CourseProgressProps {
  value: number;
  variant?: 'default' | 'success';
  size?: 'default' | 'sm';
}

const colorByVariant = {
  default: 'text-foreground',
  success: 'text-foreground',
};

const sizeByVariant = {
  default: 'text-sm',
  sm: 'text-xs',
};

export const CourseProgress = ({
  value,
  variant,
  size,
}: CourseProgressProps) => {
  return (
    <div className="mt-2">
      <Progress className="h-2" value={value} variant={variant} />
      <p
        className={cn(
          'mt-2 font-mono font-medium text-brand',
          colorByVariant[variant || 'default'],
          sizeByVariant[size || 'default'],
        )}
      >
        {Math.round(value)}% Complete
      </p>
    </div>
  );
};
