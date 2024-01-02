const VERCEL_URL = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : '';

export const APP_BP = '/studio';

export const DEFAULT_LOCALE = 'en';

export const MAX_FREE_TOKENS = 30;

export const COURSE_DEFAULT_PRICE = 12;

export const SITE_URL =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : process.env.NEXT_PUBLIC_APP_URL || VERCEL_URL || 'http://localhost:3001';
