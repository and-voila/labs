import { fileURLToPath } from 'url';

/** @typedef {import("prettier").Config} PrettierConfig */
/** @typedef {import("prettier-plugin-tailwindcss").PluginOptions} TailwindConfig */
/** @typedef {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig */

/** @type { PrettierConfig | SortImportsConfig | TailwindConfig } */
const config = {
  arrowParens: 'always',
  bracketSpacing: true,
  endOfLine: 'lf',
  printWidth: 80,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
  tailwindConfig: fileURLToPath(
    new URL('../../tooling/tailwind/index.ts', import.meta.url),
  ),
  tailwindFunctions: ['clsx', 'cn', 'cva', 'tw'],
  importOrder: [
    '^#/env(.*)$',
    '',
    '<TYPES>',
    '',
    '<BUILT_IN_MODULES>',
    '^(react/(.*)$)|^(react$)',
    '^(next/(.*)$)|^(next$)',
    '<THIRD_PARTY_MODULES>',
    '',
    '<TYPES>^@av',
    '^@av/(.*)$',
    '',
    '<TYPES>^[.|..|~]',
    '',
    '^#/config/(.*)$',
    '',
    '^#/lib/(.*)$',
    '^#/lib/hooks/(.*)$',
    '',
    '^#/components/(.*)$',
    '^#/styles/(.*)$',
    '',
    '^#/(.*)$',
    '',
    '^~/',
    '^[../]',
    '^[./]',
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderTypeScriptVersion: '4.4.0',
};

export default config;
