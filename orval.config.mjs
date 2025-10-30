import { defineConfig } from 'orval';

export default defineConfig({
  'url-shortener-api': {
    input: {
      target: 'http://localhost:3000/api/docs-json',
    },
    output: './tmp/api.ts',
  },
});
