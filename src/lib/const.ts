const VERCEL_URL = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : '';

/** https://labs.andvoila.gg */
export const WEBAPP_URL =
  process.env.NEXT_PUBLIC_WEBAPP_URL || VERCEL_URL || 'http://localhost:3001';

export const __DEV__ = !(process?.env.NODE_ENV === 'production');

export const APP_BP = '/studio'; // app's base path

export const DEFAULT_LOCALE = 'en';

export const MAX_FREE_TOKENS = 30;

export const COURSE_DEFAULT_PRICE = 12;

export const BASE_URL =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001';
