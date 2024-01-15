import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    AUTH_BEARER_TOKEN: z.string().min(1).optional(),
    BLOB_READ_WRITE_TOKEN: z.string().min(1),
    DATABASE_URL: z.string().min(1),
    DISCORD_CLIENT_ID: z.string().min(1),
    DISCORD_CLIENT_SECRET: z.string().min(1),
    GITHUB_OAUTH_TOKEN: z.string().min(1),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    KV_REST_API_TOKEN: z.string().min(1),
    KV_REST_API_URL: z.string().min(1),
    NEXTAUTH_SECRET: z.string().min(1),
    NEXTAUTH_URL: z.string().url().optional(),
    POSTGRES_URL_NON_POOLING: z.string().min(1),
    PROJECT_ID_VERCEL: z.string().min(1),
    RATELIMIT_UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
    RATELIMIT_UPSTASH_REDIS_REST_URL: z.string().min(1),
    RESEND_API_KEY: z.string().min(1),
    RESERVED_DOMAINS: z.string().min(1),
    STRIPE_API_KEY: z.string().min(1),
    STRIPE_COUPON_ID: z.string().min(1),
    STRIPE_WEBHOOK_SECRET: z.string().min(1),
    TEAM_ID_VERCEL: z.string().min(1),
    TIPTAP_AI_SECRET: z.string().min(1),
    TIPTAP_COLLAB_API_SECRET: z.string().min(1),
    TIPTAP_COLLAB_SECRET: z.string().min(1),
    TWITTER_CREATOR: z.string().min(1),
    TWITTER_SITE: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().min(1),
    NEXT_PUBLIC_ROOT_DOMAIN: z.string().min(1),
    NEXT_PUBLIC_POSTHOG_KEY: z.string().min(1),
    NEXT_PUBLIC_POSTHOG_HOST: z.string().min(1),
    NEXT_PUBLIC_STRIPE_BEST_MONTHLY_PRICE_ID: z.string().min(1),
    NEXT_PUBLIC_STRIPE_BEST_YEARLY_PRICE_ID: z.string().min(1),
    NEXT_PUBLIC_STRIPE_BETTER_MONTHLY_PRICE_ID: z.string().min(1),
    NEXT_PUBLIC_STRIPE_BETTER_YEARLY_PRICE_ID: z.string().min(1),
    NEXT_PUBLIC_ADMIN_ID: z.string().min(1),
    NEXT_PUBLIC_TIPTAP_AI_APP_ID: z.string().min(1),
    NEXT_PUBLIC_TIPTAP_AI_BASE_URL: z.string().min(1),
    NEXT_PUBLIC_TIPTAP_COLLAB_APP_ID: z.string().min(1),
    NEXT_PUBLIC_COLLAB_DOC_PREFIX: z.string().min(1),
  },
  runtimeEnv: {
    AUTH_BEARER_TOKEN: process.env.AUTH_BEARER_TOKEN,
    BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
    DATABASE_URL: process.env.DATABASE_URL,
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
    GITHUB_OAUTH_TOKEN: process.env.GITHUB_OAUTH_TOKEN,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN,
    KV_REST_API_URL: process.env.KV_REST_API_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXT_PUBLIC_APP_URL:
      process.env.VERCEL_ENV === 'production'
        ? `${process.env.NEXT_PUBLIC_APP_URL}`
        : process.env.VERCEL_ENV === 'preview'
          ? `${process.env.VERCEL_URL}`
          : 'http://localhost:3001',
    NEXT_PUBLIC_POSTHOG_HOST:
      process.env.VERCEL_ENV === 'production'
        ? `${process.env.NEXT_PUBLIC_APP_URL}/ingest`
        : process.env.VERCEL_ENV === 'preview'
          ? `${process.env.VERCEL_URL}/ingest`
          : 'http://localhost:3001/ingest',
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_ROOT_DOMAIN: process.env.NEXT_PUBLIC_ROOT_DOMAIN,
    NEXT_PUBLIC_STRIPE_BEST_MONTHLY_PRICE_ID:
      process.env.NEXT_PUBLIC_STRIPE_BEST_MONTHLY_PRICE_ID,
    NEXT_PUBLIC_STRIPE_BEST_YEARLY_PRICE_ID:
      process.env.NEXT_PUBLIC_STRIPE_BEST_YEARLY_PRICE_ID,
    NEXT_PUBLIC_STRIPE_BETTER_MONTHLY_PRICE_ID:
      process.env.NEXT_PUBLIC_STRIPE_BETTER_MONTHLY_PRICE_ID,
    NEXT_PUBLIC_STRIPE_BETTER_YEARLY_PRICE_ID:
      process.env.NEXT_PUBLIC_STRIPE_BETTER_YEARLY_PRICE_ID,
    NEXT_PUBLIC_ADMIN_ID: process.env.NEXT_PUBLIC_ADMIN_ID,
    NEXT_PUBLIC_TIPTAP_AI_APP_ID: process.env.NEXT_PUBLIC_TIPTAP_AI_APP_ID,
    NEXT_PUBLIC_TIPTAP_AI_BASE_URL: process.env.NEXT_PUBLIC_TIPTAP_AI_BASE_URL,
    NEXT_PUBLIC_TIPTAP_COLLAB_APP_ID:
      process.env.NEXT_PUBLIC_TIPTAP_COLLAB_APP_ID,
    NEXT_PUBLIC_COLLAB_DOC_PREFIX: process.env.NEXT_PUBLIC_COLLAB_DOC_PREFIX,
    POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
    PROJECT_ID_VERCEL: process.env.PROJECT_ID_VERCEL,
    RATELIMIT_UPSTASH_REDIS_REST_TOKEN:
      process.env.RATELIMIT_UPSTASH_REDIS_REST_TOKEN,
    RATELIMIT_UPSTASH_REDIS_REST_URL:
      process.env.RATELIMIT_UPSTASH_REDIS_REST_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESERVED_DOMAINS: process.env.RESERVED_DOMAINS,
    STRIPE_API_KEY: process.env.STRIPE_API_KEY,
    STRIPE_COUPON_ID: process.env.STRIPE_COUPON_ID,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    TEAM_ID_VERCEL: process.env.TEAM_ID_VERCEL,
    TIPTAP_AI_SECRET: process.env.TIPTAP_AI_SECRET,
    TIPTAP_COLLAB_API_SECRET: process.env.TIPTAP_COLLAB_API_SECRET,
    TIPTAP_COLLAB_SECRET: process.env.TIPTAP_COLLAB_SECRET,
    TWITTER_CREATOR: process.env.TWITTER_CREATOR,
    TWITTER_SITE: process.env.TWITTER_SITE,
  },
});
