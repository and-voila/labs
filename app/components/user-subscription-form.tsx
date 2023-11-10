import { SubscriptionButton } from '@/app/components/subscription-button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';

interface UserSubscriptionFormProps {
  isPaidMember: boolean;
}

export const UserSubscriptionForm: React.FC<UserSubscriptionFormProps> = ({
  isPaidMember,
}) => (
  <div className="mx-auto grid max-w-md gap-10">
    <Card>
      <CardHeader>
        <CardTitle>
          {isPaidMember ? 'Manage Subscription' : 'Ready to go Premium?'}
        </CardTitle>
        <CardDescription>
          {isPaidMember
            ? 'Update your payment info, change billing cycle, or cancel. Payment processing handled securely by Stripe.'
            : 'Subscribe today. Backed by our 100% Delight Guarantee. Payments are handled by Stripe, ensuring a secure and smooth experience.'}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <SubscriptionButton isPaidMember={isPaidMember} size="sm" />
      </CardFooter>
    </Card>
  </div>
);
