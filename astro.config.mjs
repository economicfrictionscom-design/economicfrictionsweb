import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
    site: 'https://www.economicfrictions.com',
    base: '',
    trailingSlash: 'always', // Critical for GitHub Pages directory mapping
    build: {
      format: 'directory' // Ensures URLs look like /blog/post/
    },
    integrations: [mdx(), sitemap(), tailwind()],
});