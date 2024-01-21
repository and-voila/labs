// eslint-disable-next-line camelcase
import { Inter, Lora, Work_Sans } from 'next/font/google';
import localFont from 'next/font/local';

export const fontBricolage = localFont({
  src: './bricolage-variable.woff2',
  variable: '--font-bricolage',
  weight: '200 900',
});

export const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});
export const cal = localFont({
  src: './calsans-semibold.otf',
  variable: '--font-cal',
  weight: '600',
  display: 'swap',
});

export const calTitle = localFont({
  src: './calsans-semibold.otf',
  variable: '--font-title',
  weight: '600',
  display: 'swap',
});
export const lora = Lora({
  variable: '--font-title',
  subsets: ['latin'],
  weight: '600',
  display: 'swap',
});
export const work = Work_Sans({
  variable: '--font-title',
  subsets: ['latin'],
  weight: '600',
  display: 'swap',
});

export const fontMapper = {
  'font-cal': calTitle.variable,
  'font-lora': lora.variable,
  'font-work': work.variable,
} as Record<string, string>;
