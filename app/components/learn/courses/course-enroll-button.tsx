'use client';

import { useTransition } from 'react';

import { Button } from '@/app/components/ui/button';
import { toast } from '@/app/components/ui/use-toast';
import {
  CheckoutResponse,
  generateCourseCheckout,
} from '@/app/lib/actions/generate-course-checkout';
import { formatPrice } from '@/app/lib/format';

interface CourseEnrollButtonProps {
  price: number;
  courseId: string;
}

export const CourseEnrollButton = ({
  price,
  courseId,
}: CourseEnrollButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const generateCourseCheckoutSession = generateCourseCheckout.bind(
    null,
    courseId,
  );

  const courseCheckoutAction = () =>
    startTransition(async () => {
      try {
        const response: CheckoutResponse =
          await generateCourseCheckoutSession();
        window.location.assign(response.url);
      } catch (error) {
        toast({
          title: 'Unable to create Stripe checkout session',
          description:
            "Sorry for the inconvenience. An error occured and our systems couldn't connect to Stripe to handle your request. Please try again.",
          variant: 'destructive',
        });
      }
    });

  return (
    <Button
      variant="secondary"
      onClick={courseCheckoutAction}
      disabled={isPending}
      size="sm"
      className="w-full flex-shrink-0 lg:w-auto"
    >
      {isPending ? 'Processing...' : `Buy for ${formatPrice(price)}`}
    </Button>
  );
};
