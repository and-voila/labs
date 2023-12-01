import { cva, VariantProps } from 'class-variance-authority';

import { Icons } from '@/app/components/shared/icons';
import { cn } from '@/app/lib/utils';

const bannerVariants = cva(
  'border-2 text-center p-4 text-base flex items-center w-full mt-0.5',
  {
    variants: {
      variant: {
        warning: 'bg-yellow-400 border-yellow-600 text-black font-medium',
        success: 'bg-alternate border-green-600 text-white font-medium',
      },
    },
    defaultVariants: {
      variant: 'warning',
    },
  },
);

interface BannerProps extends VariantProps<typeof bannerVariants> {
  label: string;
}

const iconMap = {
  warning: Icons.warning,
  success: Icons.circleChecked,
};

export const Banner = ({ label, variant }: BannerProps) => {
  const Icon = iconMap[variant || 'warning'];

  return (
    <div className={cn(bannerVariants({ variant }))}>
      <Icon className="mr-2 h-6 w-6" />
      {label}
    </div>
  );
};
