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
    MUX_TOKEN_ID: z.string().min(1),
    MUX_TOKEN_SECRET: z.string().min(1),
    NEXTAUTH_SECRET: z.string().min(1),
    NEXTAUTH_URL: z.string().url().optional(),
    OPENAI_API_KEY: z.string().min(1),
    OPENAI_ASSISTANT_ID: z.string().min(1),
    POSTGRES_URL_NON_POOLING: z.string().min(1),
    POSTMARK_ACTIVATION_TEMPLATE: z.string().min(1),
    POSTMARK_API_TOKEN: z.string().min(1),
    POSTMARK_SIGN_IN_TEMPLATE: z.string().min(1),
    PROJECT_ID_VERCEL: z.string().min(1),
    RESEND_API_KEY: z.string().min(1),
    RESERVED_DOMAINS: z.string().min(1),
    SMTP_FROM: z.string().email(),
    STRIPE_API_KEY: z.string().min(1),
    STRIPE_COUPON_ID: z.string().min(1),
    STRIPE_WEBHOOK_SECRET: z.string().min(1),
    TEAM_ID_VERCEL: z.string().min(1),
    TWITTER_CREATOR: z.string().min(1),
    TWITTER_SITE: z.string().min(1),
    TURSO_AUTH_TOKEN: z.string().min(1),
    TURSO_DATABASE_URL: z.string().min(1),
    UPLOADTHING_APP_ID: z.string().min(1),
    UPLOADTHING_SECRET: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().min(1),
    NEXT_PUBLIC_ROOT_DOMAIN: z.string().min(1),
    NEXT_PUBLIC_STRIPE_BEST_MONTHLY_PRICE_ID: z.string().min(1),
    NEXT_PUBLIC_STRIPE_BEST_YEARLY_PRICE_ID: z.string().min(1),
    NEXT_PUBLIC_STRIPE_BETTER_MONTHLY_PRICE_ID: z.string().min(1),
    NEXT_PUBLIC_STRIPE_BETTER_YEARLY_PRICE_ID: z.string().min(1),
    NEXT_PUBLIC_STRIPE_TEAMS_MONTHLY_PRICE_ID: z.string().min(1),
    NEXT_PUBLIC_STRIPE_TEAMS_YEARLY_PRICE_ID: z.string().min(1),
    NEXT_PUBLIC_TEACHER_ID: z.string().min(1),
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
    MUX_TOKEN_ID: process.env.MUX_TOKEN_ID,
    MUX_TOKEN_SECRET: process.env.MUX_TOKEN_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_ROOT_DOMAIN: process.env.NEXT_PUBLIC_ROOT_DOMAIN,
    NEXT_PUBLIC_STRIPE_BEST_MONTHLY_PRICE_ID:
      process.env.NEXT_PUBLIC_STRIPE_BEST_MONTHLY_PRICE_ID,
    NEXT_PUBLIC_STRIPE_BEST_YEARLY_PRICE_ID:
      process.env.NEXT_PUBLIC_STRIPE_BEST_YEARLY_PRICE_ID,
    NEXT_PUBLIC_STRIPE_BETTER_MONTHLY_PRICE_ID:
      process.env.NEXT_PUBLIC_STRIPE_BETTER_MONTHLY_PRICE_ID,
    NEXT_PUBLIC_STRIPE_BETTER_YEARLY_PRICE_ID:
      process.env.NEXT_PUBLIC_STRIPE_BETTER_YEARLY_PRICE_ID,
    NEXT_PUBLIC_STRIPE_TEAMS_MONTHLY_PRICE_ID:
      process.env.NEXT_PUBLIC_STRIPE_TEAMS_MONTHLY_PRICE_ID,
    NEXT_PUBLIC_STRIPE_TEAMS_YEARLY_PRICE_ID:
      process.env.NEXT_PUBLIC_STRIPE_TEAMS_YEARLY_PRICE_ID,
    NEXT_PUBLIC_TEACHER_ID: process.env.NEXT_PUBLIC_TEACHER_ID,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    OPENAI_ASSISTANT_ID: process.env.OPENAI_ASSISTANT_ID,
    POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
    POSTMARK_ACTIVATION_TEMPLATE: process.env.POSTMARK_ACTIVATION_TEMPLATE,
    POSTMARK_API_TOKEN: process.env.POSTMARK_API_TOKEN,
    POSTMARK_SIGN_IN_TEMPLATE: process.env.POSTMARK_SIGN_IN_TEMPLATE,
    PROJECT_ID_VERCEL: process.env.PROJECT_ID_VERCEL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESERVED_DOMAINS: process.env.RESERVED_DOMAINS,
    SMTP_FROM: process.env.SMTP_FROM,
    STRIPE_API_KEY: process.env.STRIPE_API_KEY,
    STRIPE_COUPON_ID: process.env.STRIPE_COUPON_ID,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    TEAM_ID_VERCEL: process.env.TEAM_ID_VERCEL,
    TWITTER_CREATOR: process.env.TWITTER_CREATOR,
    TWITTER_SITE: process.env.TWITTER_SITE,
    TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN,
    TURSO_DATABASE_URL: process.env.TURSO_DATABASE_URL,
    UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID,
    UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET,
  },
});
