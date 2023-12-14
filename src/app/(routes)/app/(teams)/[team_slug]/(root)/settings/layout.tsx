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
    <div className="mx-auto w-full max-w-7xl p-8">
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
          ]}
        />
      </div>
      <div className="py-8">{children}</div>
    </div>
  );
};

export default SettingsLayout;
