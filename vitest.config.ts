import swc from 'unplugin-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    root: 'test',
    include: ['**/*.spec.ts'],
  },
  plugins: [swc.vite({}), tsconfigPaths()],
  resolve: {
    alias: {},
  },
});
