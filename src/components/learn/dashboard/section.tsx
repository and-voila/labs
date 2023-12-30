import { IconBadge } from '#/components/learn/dashboard/icon-badge';
import { IconName } from '#/components/shared/icons';

type SectionProps = {
  title: string;
  icon: IconName;
  children: React.ReactNode;
};

export const Section = ({ title, icon, children }: SectionProps) => (
  <div>
    <div className="mb-6 flex items-center">
      <IconBadge icon={icon} />
      <h2 className="text-lg font-bold tracking-tight">{title}</h2>
    </div>
    <div className="space-y-8">{children}</div>
  </div>
);
