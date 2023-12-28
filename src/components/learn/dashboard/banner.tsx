import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '#/lib/utils';

import { Icons } from '#/components/shared/icons';

const bannerVariants = cva(
  'border-2 text-center p-4 text-base flex items-center w-full mb-2',
  {
    variants: {
      variant: {
        warning: 'border-orange-600/80 border-2 border-dotted font-medium',
        success:
          'border-alternate/80 border-2 border-dotted text-alternate font-medium',
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
