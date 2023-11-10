import { redirect } from 'next/navigation';

import { authOptions } from '@/lib/auth';
import { getCurrentUser } from '@/lib/session';
import { getUserSubscriptionPlan } from '@/lib/subscription';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BillingInfo } from '@/components/billing-info';
import { DashboardHeader } from '@/components/dashboard/header';
import { DashboardShell } from '@/components/dashboard/shell';
import { Icons } from '@/components/shared/icons';

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
