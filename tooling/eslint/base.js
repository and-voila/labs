/** @type {import("eslint").Linter.Config} */
const config = {
  extends: [
    'turbo',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:prettier/recommended',
    'prettier',
  ],
  env: {
    es2022: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: { project: true },
  plugins: [
    '@typescript-eslint',
    'import',
    'tailwindcss',
    'unicorn',
    'prettier',
  ],
  rules: {
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
    ],
    '@typescript-eslint/no-misused-promises': [
      2,
      { checksVoidReturn: { attributes: false } },
    ],
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'after-used',
        argsIgnorePattern: '^_',
        caughtErrors: 'none',
        ignoreRestSiblings: true,
        vars: 'all',
        varsIgnorePattern: '^_',
      },
    ],
    camelcase: ['error', { properties: 'never', ignoreDestructuring: true }],
    'comma-style': ['error', 'last'],
    'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
    'import/no-anonymous-default-export': 'off',
    'jsx-quotes': ['error', 'prefer-double'],
    'no-console': 'warn',
    'prefer-const': 'error',
    'prettier/prettier': ['error'],
    quotes: ['error', 'single', { avoidEscape: true }],
    semi: ['error', 'always'],
    'turbo/no-undeclared-env-vars': 'off',
    'unicorn/filename-case': [
      'error',
      {
        case: 'kebabCase',
      },
    ],
  },
  ignorePatterns: [
    '**/*.config.js',
    '**/*.config.cjs',
    '**/.eslintrc.cjs',
    '.next',
    'dist',
    'pnpm-lock.yaml',
  ],
  reportUnusedDisableDirectives: true,
};

module.exports = config;
