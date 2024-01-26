import type { Config } from 'tailwindcss';

import baseConfig from '@av/tailwind-config';

export default {
  content: [...baseConfig.content, '../../packages/ui/**/*.{ts,tsx}'],
  presets: [baseConfig],
  theme: {
    extend: {
      /* Coming soon */
    },
  },
} satisfies Config;
