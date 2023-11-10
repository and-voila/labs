'use client';

import { useState } from 'react';
import axios from 'axios';

import { Button } from '@/app/components/ui/button';
import { toast } from '@/app/components/ui/use-toast';

export const SubscriptionButton = ({
  isPaidMember = false,
  size,
}: {
  isPaidMember: boolean;
  size?: 'default' | 'sm' | 'lg' | 'icon';
}) => {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);

      const response = await axios.get('/api/stripe');

      window.location.href = response.data.url;
    } catch (error) {
      toast({
        title: 'Oh no, an error occured!',
        description:
          "Apologies! We're in beta and thing's are a bit rough around the edges. Please try again.",
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      size={size}
      variant={isPaidMember ? 'secondary' : 'custom'}
      disabled={loading}
      onClick={onClick}
      className="w-full lg:w-auto"
    >
      {isPaidMember ? 'Manage Subscription' : 'Upgrade'}
      {!isPaidMember}
    </Button>
  );
};
