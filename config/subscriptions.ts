import { SubscriptionPlan } from 'types';
import { env } from '@/env.mjs';

export const pricingData: SubscriptionPlan[] = [
  {
    title: 'Good',
    description:
      'The Good plan is free for everyone. It offers a primer to our premium Discord community, selected classes, and 30 AI-assist tokens to get you started.',
    benefits: [
      'Community access with select AMA sessions',
      'Entry to the standard playbook library',
      'Weekly marketing digests to keep you updated',
      '30 AI-assist tokens per month to boost your marketing',
    ],
    limitations: [],
    prices: {
      monthly: 0,
      yearly: 0,
    },
    stripeIds: {
      monthly: null,
      yearly: null,
    },
  },
  {
    title: 'Better',
    description:
      'The Better plan is a value-packed upgrade. Gain full access to our Discord community, direct mod support, all classes, and 3,000 AI-assist tokens for a deeper dive.',
    benefits: [
      'Unrestricted community access and support from mods',
      'Unlimited access to all classes and premium content',
      '3,000 AI-assist tokens for expansive campaign reach',
      'Advanced analytics for deeper insights',
      'Priority customer support for quicker resolutions',
    ],
    limitations: [],
    prices: {
      monthly: 49,
      yearly: 480,
    },
    stripeIds: {
      monthly: env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID,
      yearly: env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID,
    },
  },
  {
    title: 'Best',
    description:
      'The Best plan is the ultimate package. Unlock all-access to our Discord community, top-tier support, comprehensive classes, and 7,500 AI-assist tokens for maximum impact.',
    benefits: [
      'Priority access to new features and updates',
      'Comprehensive playbook access for strategic advantage',
      '7,500 AI-assist tokens to perfect your campaigns',
      'Real-time analytics for instant marketing adaptability',
      '24/7 dedicated support and personalized onboarding',
    ],
    limitations: [],
    prices: {
      monthly: 99,
      yearly: 950,
    },
    stripeIds: {
      monthly: env.NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PLAN_ID,
      yearly: env.NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PLAN_ID,
    },
  },
];
