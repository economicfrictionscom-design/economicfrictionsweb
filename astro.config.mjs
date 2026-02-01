import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://www.economicfrictions.com',
  base: '/',
  // Removed trailingSlash: 'always'
  build: {
    format: 'directory',
  },
  integrations: [mdx(), sitemap(), tailwind()],
});