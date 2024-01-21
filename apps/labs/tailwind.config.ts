import type { Config } from 'tailwindcss';

import baseConfig from '@and-voila/tailwind-config';

export default {
  content: [...baseConfig.content, '../../packages/ui/**/*.{ts,tsx}'],
  presets: [baseConfig],
  theme: {
    extend: {
      /* Coming soon */
    },
  },
} satisfies Config;
