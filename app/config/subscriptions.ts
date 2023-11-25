import { env } from '@/env.mjs';
import { SubscriptionPlan } from '@/app/lib/types';

export const pricingData: SubscriptionPlan[] = [
  {
    title: 'Good',
    description:
      'The Good plan is free for everyone. It includes essential resources and tools for a good start in digital marketing.',
    benefits: [
      'Access key Discord channels',
      'Two monthly expert AMAs',
      'Large Playbooks library',
      'Insights, Briefs, and Guides',
      '30 AI-assist tokens or BYOK',
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
      'The Better plan is a value-packed upgrade. Elevate your marketing with full community access, enhanced tools, 3,000 monthly AI-assist tokens, and expert one-on-one support.',
    benefits: [
      'Full access to Discord',
      'Personal AMAs with our expert mods',
      'Unlimited community AMAs',
      'Exclusive monthly events',
      'Full Playbook library',
      'All our Insights, Briefs, and Guides',
      'Special discounts on leading marketing tools',
      '3,000 monthly AI-assist tokens',
      'Flexible token refills or BYOK',
      'Fast-track support',
    ],

    limitations: [],
    prices: {
      monthly: 49,
      yearly: 480,
    },
    stripeIds: {
      monthly: env.NEXT_PUBLIC_STRIPE_BETTER_MONTHLY_PRICE_ID,
      yearly: env.NEXT_PUBLIC_STRIPE_BETTER_YEARLY_PRICE_ID,
    },
  },
  {
    title: 'Best',
    description:
      'The Best plan is the ultimate package. You get all-access to our Discord community, top-tier support, advanced learning, and 7,500 monthly AI-assist tokens.',
    benefits: [
      'Unlimited access to Discord',
      'Private AMAs with industry experts',
      'All-access pass to community AMAs and VIP events',
      'Front-row to monthly events',
      'Access the entire Playbook library',
      'Insights, Briefs, Guides, and more',
      'Killer discounts on top-tier marketing tools',
      '7,500 monthly AI-assist tokens',
      'Add more tokens as needed or BYOK',
      '24/7 personalized support and dedicated assistance',
    ],
    limitations: [],
    prices: {
      monthly: 99,
      yearly: 950,
    },
    stripeIds: {
      monthly: env.NEXT_PUBLIC_STRIPE_BEST_MONTHLY_PRICE_ID,
      yearly: env.NEXT_PUBLIC_STRIPE_BEST_YEARLY_PRICE_ID,
    },
  },
  {
    title: 'Teams',
    description:
      'The Teams plan includes everything in the Best plan for up to 5 users. It also includes user roles, analytics, priority support, collaboration features, moderation tools, and shared resources/assets.',
    benefits: [
      'Everything in the Best plan',
      'Up to 5 users',
      'Collaboration features',
      'Moderation tools',
      'User roles',
      'Analytics',
      'Priority support',
      'Shared asset library',
      'Additional users at $59/mo',
      'Free billing users',
    ],
    limitations: [],
    prices: {
      monthly: 395,
      yearly: 3800,
    },
    stripeIds: {
      monthly: env.NEXT_PUBLIC_STRIPE_TEAMS_MONTHLY_PRICE_ID,
      yearly: env.NEXT_PUBLIC_STRIPE_TEAMS_YEARLY_PRICE_ID,
    },
  },
];
