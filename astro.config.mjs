// astro.config.mjs
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://adrianmariscal.netlify.app',
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwind()],
  },
});
