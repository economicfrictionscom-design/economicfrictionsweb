import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';

export default defineConfig({
  // This tells Astro exactly where your site lives on the internet
  site: 'https://economicfrictionscom-design.github.io',
  base: '/economicfrictionsweb',

  vite: {
    plugins: [tailwind()],
  },
});