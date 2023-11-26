import { IconBadge } from '@/app/components/icon-badge';
import { IconName } from '@/app/components/shared/icons';

interface InfoCardProps {
  numberOfItems: number;
  variant?: 'default' | 'success';
  label: string;
  icon: IconName;
}

export const InfoCard = ({
  variant,
  icon,
  numberOfItems,
  label,
}: InfoCardProps) => {
  return (
    <div className="flex items-center gap-x-2 rounded-md border bg-card p-3 shadow">
      <IconBadge variant={variant} icon={icon} />
      <div>
        <p className="font-semibold">{label}</p>
        <p className="text-sm text-muted-foreground">
          {numberOfItems} {numberOfItems === 1 ? 'Playbook' : 'Playbooks'}
        </p>
      </div>
    </div>
  );
};
