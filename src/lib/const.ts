const VERCEL_URL = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : '';

/** https://labs.andvoila.gg */
export const WEBAPP_URL =
  process.env.NEXT_PUBLIC_WEBAPP_URL || VERCEL_URL || 'http://localhost:3001';

export const __DEV__ = !(process?.env.NODE_ENV === 'production');

export const APP_BP = '/studio'; // app's base path

export const DEFAULT_LOCALE = 'en';
