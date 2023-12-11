import { siteConfig } from '../config/site';

const VERCEL_URL = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : '';
const RAILWAY_STATIC_URL = process.env.RAILWAY_STATIC_URL
  ? `https://${process.env.RAILWAY_STATIC_URL}`
  : '';
const HEROKU_URL = process.env.HEROKU_APP_NAME
  ? `https://${process.env.HEROKU_APP_NAME}.herokuapp.com`
  : '';
const RENDER_URL = process.env.RENDER_EXTERNAL_URL
  ? `https://${process.env.RENDER_EXTERNAL_URL}`
  : '';

/** https://app.your-saas.com */
export const WEBAPP_URL =
  process.env.NEXT_PUBLIC_WEBAPP_URL ||
  VERCEL_URL ||
  RAILWAY_STATIC_URL ||
  HEROKU_URL ||
  RENDER_URL ||
  'http://localhost:3010';

export const __DEV__ = !(process?.env.NODE_ENV === 'production');

export const APP_NAME = siteConfig.name;
export const CP_PREFIX = '/app';

export const DEFAULT_LOCALE = 'en';
