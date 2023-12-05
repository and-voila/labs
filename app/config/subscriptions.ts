import { env } from '@/env.mjs';
import { SubscriptionPlan } from '@/app/lib/types';

export const pricingData: SubscriptionPlan[] = [
  {
    title: 'Good',
    description:
      'The Good plan is free for everyone. It includes essential resources and tools for a good start in digital marketing.',
    benefits: [
      'Access 10+ Discord channels',
      'Join two expert AMAs',
      'Extensive access to Playbooks',
      'Explore key Insights, Briefs, and Guides',
      'Create 3 websites',
      'Add custom domains or use ours',
      'AI editor (GPT-3.5 Turbo) at your service',
      '750 AI credits',
      'Add your own API key',
      'Manage 100 posts per website',
      '24/7 live support',
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
      'The Better plan is a value-packed upgrade. Elevate your marketing with full community access, enhanced tools, 3,000 monthly AI-assist tokens, and expert one-on-one support.',
    benefits: [
      'Access all Discord channels',
      'Attend all AMAs',
      'Personal AMAs with expert mods',
      'Full Playbook library',
      'All our Insights, Briefs, and Guides',
      'Create 10 websites',
      'Customize site colors',
      'Curated designer fonts',
      'Latest OpenAI model AI editor',
      '1,500 AI credits',
      'Flexible AI credit refills',
      'Add your own API key',
      'Unlimited posts per website',
      '24/7 live support',
      '100% Delight guaranteed',
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
      'The Best plan is the ultimate package. You get all-access to our Discord community, top-tier support, advanced learning, and 7,500 monthly AI-assist tokens.',
    benefits: [
      'Everything in Better',
      'Join VIP events',
      'Early access to new features',
      'Unlimited websites',
      'And Voila Savings Club',
      '2,500 AI credits',
      'Collaboration features',
      'Moderation tools',
      'User roles',
      'Priority 24/7 live support',
      'Additional users at $79/mo',
      '100% Delight guaranteed',
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
  {
    title: 'Teams',
    description:
      'The Teams plan includes everything in the Best plan for up to 5 users. It also includes user roles, analytics, priority support, collaboration features, moderation tools, and shared resources/assets.',
    benefits: [
      'Everything in Best',
      'Team access for up to 5 users',
      '12,500 AI credits',
      'Shared asset library',
      'Additional users at $59/mo',
      '100% Delight guaranteed',
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
    rateLimit: 415,
    models: ['gpt-4-1106-preview'],
  },
];
