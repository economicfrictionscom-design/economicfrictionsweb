import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
    site: 'https://www.economicfrictions.com',
    base: '',
    // CRITICAL FIXES FOR GITHUB PAGES 404
    trailingSlash: 'always', 
    build: {
      format: 'directory'
    },
    integrations: [mdx(), sitemap(), tailwind()],
});