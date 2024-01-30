import { env } from '#/env';

import type { SubscriptionPlan } from '#/lib/types';

export const pricingData: SubscriptionPlan[] = [
  {
    title: 'Good',
    description:
      'Forever free. Jumpstart your digital marketing with essential tools.',
    benefits: [
      'Build your first website',
      'Personalize with your domain',
      'Create with AI (GPT-3.5 Turbo)',
      'Secure your IP with AndChain',
      '500 AI credits for creative content',
      'Guided strategy for AI content',
      'Fast, responsive support',
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
    rateLimit: 50,
    models: ['gpt-3.5-turbo'],
  },
  {
    title: 'Better',
    description: 'Upgrade your marketing with collaboration and growth tools.',
    benefits: [
      'Everything in Good',
      'Multiplayer editing',
      'Billing per active user',
      'Up to 5 websites',
      'Custom site colors',
      'Designer font library',
      'Latest AI model (GPT-4)',
      '1,500 AI credits',
      'Advanced SEO tools',
      'Same-day support',
      '100% Delight Guarantee',
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
    rateLimit: 50,
    models: ['gpt-4-1106-preview'],
  },
  {
    title: 'Best',
    description:
      'All-in marketing suite with top-tier AI tools and expert support.',
    benefits: [
      'Everything in Better',
      'Guest access',
      'Unlimited websites',
      '3,500 AI credits',
      'Unlimited AI content strategies',
      'AI-powered analytics',
      'Early feature access',
      '24/7 live support',
      '100% Delight Guarantee',
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
    rateLimit: 83,
    models: ['gpt-4-1106-preview'],
  },
];
