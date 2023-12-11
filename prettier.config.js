/** @type {import('prettier').Config} */
module.exports = {
  bracketSpacing: true,
  endOfLine: 'lf',
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
  bracketSpacing: true,
  arrowParens: 'always',
  printWidth: 80,
  tailwindFunctions: ['cn', 'clsx', 'tw'],
  tailwindConfig: './tailwind.config.js',
  plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-tailwindcss'],
};
