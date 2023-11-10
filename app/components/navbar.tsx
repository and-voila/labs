import { UserAccountNav } from '@/app/components/layout/user-account-nav';
import { MobileSidebar } from '@/app/components/mobile-sidebar';
import { NavbarRoutes } from '@/app/config/navbar-routes';
import { checkSubscription } from '@/app/lib/actions/check-subscription';
import { getApiLimitCount } from '@/app/lib/api-limit';
import { getCurrentUser } from '@/app/lib/session';

export const Navbar = async () => {
  const apiLimitCount = await getApiLimitCount();
  const isPaidMember = await checkSubscription();
  const user = await getCurrentUser();
  const userId = user?.id;
  return (
    <div className="flex h-full items-center border-b bg-[#dcdfe5] p-4 shadow-sm dark:bg-[#16161a]">
      <MobileSidebar
        isPaidMember={isPaidMember}
        apiLimitCount={apiLimitCount}
      />
      <NavbarRoutes userId={userId || '000000'} />
      <UserAccountNav
        user={{
          name: user?.name,
          image: user?.image,
          email: user?.email,
        }}
      />
    </div>
  );
};
