import { env } from '#/env';

import type { SubscriptionPlan } from '#/lib/types';

export const pricingData: SubscriptionPlan[] = [
  {
    title: 'Good',
    description:
      'Free for life. Includes the essentials to get your digital marketing journey off the ground.',
    benefits: [
      'Launch your website',
      'Customize your domain',
      'AI-powered editor (GPT-3.5 Turbo)',
      '500 AI credits for content creation',
      'AI-guided content strategy',
      'Single-channel sharing',
      'Access to comprehensive Playbooks',
      'Explore Insights, Briefs, and Guides',
      'Join 10+ Discord channels for community interaction',
      'Participate in two expert AMAs',
      'Prompt same-day support',
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
    description:
      'A serious upgrade. Collaborate in multiplayer mode, generous AI limits, and advanced tools tailored for growth.',
    benefits: [
      'All benefits from Good',
      'Real-time collaboration',
      'Convenient, per active-user billing',
      'Create up to 5 websites',
      'Personalize site colors',
      'Access curated designer fonts',
      'Latest OpenAI model for AI editor',
      '1,500 AI credits',
      'AI-powered research tools',
      'Develop 5 AI-guided content strategies',
      'Engage in multiplayer AI chat',
      'AI-enhanced SEO tools',
      'Unlimited access to Discord channels',
      'Attend all expert AMAs',
      'Book personal AMAs',
      '24/7 live support',
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
      'Everything at your fingertips. Our entire marketing-suite, the highest AI limits, and direct access to the expert crew.',
    benefits: [
      'All benefits from Better',
      'Guest access',
      'Create unlimited websites',
      '3,500 AI credits',
      'Unlimited AI-guided content strategies',
      'AI-powered analytics tools',
      'Exclusive access to VIP events',
      'Early access to new features',
      'Join the And Voila Savings Club',
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
