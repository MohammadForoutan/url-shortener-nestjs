import { defineConfig } from '@fullstacksjs/eslint-config';

export default defineConfig(
  {
    react: false,
    node: true,
    rules: {
      'perfectionist/sort-classes': 'off',
    },
  },
  {
    files: ['**/*.mapper.ts'],
    rules: {
      '@typescript-eslint/no-extraneous-class': 'off',
    },
  },
  {
    ignores: ['node_modules', 'dist', '.vscode', '.idea'],
  },
);
