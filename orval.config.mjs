import { defineConfig } from 'orval';

export default defineConfig({
  urlShortener: {
    input: {
      target: 'https://server.gglink.ir/api/docs-json',
    },
    output: {
      mode: 'tags-split',
      target: 'tmp/api/url-shortener.ts',
      schemas: 'tmp/model',
      client: 'react-query',
      baseUrl: 'https://server.gglink.ir',
    },
  },
});
