'use client';

import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

import { Icons } from '@/app/components/shared/icons';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/app/components/ui/dialog';
import { toast } from '@/app/components/ui/use-toast';
import { useProModal } from '@/app/hooks/use-pro-modal';

const features = [
  {
    label: 'Early access',
    icon: Icons.scissors,
    description: 'Save 50% for a year.',
  },
  {
    label: 'Community',
    icon: Icons.heart,
    description: 'Full access to Discord community.',
  },
  {
    label: 'Labs',
    icon: Icons.magic,
    description: 'Experience a complete marketing ecosystem.',
  },
  {
    label: 'Playbooks',
    icon: Icons.image,
    description: 'Full access to playbook library.',
  },
  {
    label: 'AI Tools',
    icon: Icons.briefcase,
    description: 'Cool AI tools to help your workflow.',
  },
  {
    label: 'Workshops',
    icon: Icons.desktop,
    description: 'Exclusive weekly sessions by experts.',
  },
  {
    label: 'Results',
    icon: Icons.rocket,
    description: 'Put it all together, and voila! ROI on fire.',
  },
];

export const ProModal = () => {
  const proModal = useProModal();
  const [loading, setLoading] = useState(false);

  const onSubscribe = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/stripe');

      window.location.href = response.data.url;
    } catch (error) {
      toast({
        title: 'Awe shucks, something went wrong.',
        description:
          'Sorry for the inconvenience, it should just work. Please try again. Thank you!',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex flex-col items-center justify-center gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 py-1 text-2xl font-bold tracking-tight">
              Become a paid member
              <Badge variant="custom" className="py-1 text-sm uppercase">
                The Best Plan
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="space-y-2 pt-2 text-center font-medium text-muted-foreground">
            <p className="mb-6 text-sm text-muted-foreground lg:text-base">
              Skyrocket your marketing performance for only{' '}
              <span className="line-through">$50</span> per month with complete
              access to the Community and Labs.
            </p>
            {features.map((feature) => (
              <Card
                key={feature.label}
                className="flex items-center justify-between border p-3"
              >
                <div className="flex items-center gap-x-4">
                  <div className="w-fit rounded-md p-2 text-muted-foreground">
                    <feature.icon className="h-4 w-4" />
                  </div>
                  <div className="font-semi-bold text-base">
                    {feature.label}
                  </div>
                  <div className="text-left text-sm text-muted-foreground">
                    {feature.description}
                  </div>
                </div>
                <Icons.check className="h-5 w-5 text-brand" />
              </Card>
            ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={loading}
            onClick={onSubscribe}
            size="lg"
            variant="custom"
            className="mt-2 w-full"
          >
            Upgrade
            <Icons.magic className="ml-2 h-4 w-4" />
          </Button>
        </DialogFooter>
        <p className="mx-auto max-w-sm text-center text-xs text-muted-foreground">
          100% delight money-back guarantee. Cancel anytime. <br /> Read our{' '}
          <Link
            href="https://andvoila.gg/terms"
            target="_blank"
            className="underline"
            aria-label="Navigate to external link to read And Voila Terms of Service"
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            href="https://andvoila.gg/privacy"
            target="_blank"
            aria-label="Navigate to external link to read And Voila Privacy Policy"
            className="underline"
          >
            Privacy Policy
          </Link>
          .
        </p>
        <div className="text-center text-xs text-muted-foreground" />
      </DialogContent>
    </Dialog>
  );
};
