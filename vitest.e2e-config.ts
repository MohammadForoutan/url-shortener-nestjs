import swc from 'unplugin-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    root: 'test',
    include: ['**/*.e2e-spec.ts'],
    setupFiles: ['dotenv/config'],
  },
  plugins: [swc.vite({}), tsconfigPaths()],
  resolve: {
    alias: {},
  },
});
