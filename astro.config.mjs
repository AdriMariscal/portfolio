// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite'; // 👈 plugin v4
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://adrianmariscal.netlify.app',
  integrations: [mdx(), sitemap()], // 👈 sin @astrojs/tailwind
  vite: {
    plugins: [tailwindcss()],        // 👈 aquí va Tailwind v4
  },
});
