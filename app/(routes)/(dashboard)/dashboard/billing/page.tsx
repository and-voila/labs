import { redirect } from 'next/navigation';

import { BillingInfo } from '@/app/components/billing-info';
import { DashboardHeader } from '@/app/components/dashboard/header';
import { DashboardShell } from '@/app/components/dashboard/shell';
import { Icons } from '@/app/components/shared/icons';
import { Alert, AlertDescription, AlertTitle } from '@/app/components/ui/alert';
import { authOptions } from '@/app/lib/auth';
import { getCurrentUser } from '@/app/lib/session';
import { getUserSubscriptionPlan } from '@/app/lib/subscription';

export const metadata = {
  title: 'Billing',
  description: 'Manage billing and your subscription plan.',
};

export default async function BillingPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || '/login');
  }

  const subscriptionPlan = await getUserSubscriptionPlan(user.id);

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Billing"
        text="Manage billing and your membership plan."
      />
      <div className="grid max-w-3xl gap-8">
        {!subscriptionPlan && (
          <Alert className="!pl-14">
            <Icons.rocket className="fill-brand" />
            <AlertTitle>Welcome to early access</AlertTitle>
            <AlertDescription className="text-muted-foreground">
              Get ready to watch your marketing ROI soar! Scoop up early access
              membership now to guarantee a year of top-tier digital marketing
              results at half the investment.
            </AlertDescription>
          </Alert>
        )}
        <BillingInfo subscriptionPlan={subscriptionPlan} />
      </div>
    </DashboardShell>
  );
}
