import { Icons } from '#/components/shared/icons';

const DashboardLogoLoader = () => {
  return (
    <div className="mt-24 flex w-full items-center justify-center lg:mt-48">
      <div className="animate-pulse">
        <Icons.logo className="h-24 w-24 text-primary" />
      </div>
    </div>
  );
};

export default DashboardLogoLoader;
