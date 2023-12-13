import { siteConfig } from '#/config/site';

const VERCEL_URL = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : '';

/** https://app.your-saas.com */
export const WEBAPP_URL =
  process.env.NEXT_PUBLIC_WEBAPP_URL || VERCEL_URL || 'http://localhost:3001';

export const __DEV__ = !(process?.env.NODE_ENV === 'production');

export const APP_NAME = siteConfig.name;
export const CP_PREFIX = '/app';

export const DEFAULT_LOCALE = 'en';
