import { CP_PREFIX } from '#/lib/const';

import { TabbedNav } from '#/components/ui/tabbed-nav';

interface SettingsLayoutProps {
  children: React.ReactNode;
  params: {
    team_slug: string;
  };
}

const SettingsLayout: React.FC<SettingsLayoutProps> = ({
  children,
  params,
}) => {
  return (
    <div className="p4 grid max-w-3xl gap-10 lg:p-8">
      <div>
        <TabbedNav
          links={[
            {
              href: `${CP_PREFIX}/${params.team_slug}/settings/general`,
              label: 'General',
            },
            {
              label: 'Members',
              href: `${CP_PREFIX}/${params.team_slug}/settings/members`,
            },
            {
              label: 'Danger Zone',
              href: `${CP_PREFIX}/${params.team_slug}/settings/danger-zone`,
            },
          ]}
        />
      </div>
      <div className="py-8">{children}</div>
    </div>
  );
};

export default SettingsLayout;
