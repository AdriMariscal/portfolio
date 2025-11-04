// astro.config.mjs
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@tailwindcss/vite'; // Tailwind v4 (plugin de Vite)

// ❗️Nada más: quitamos @astrojs/tailwind para evitar el error

export default defineConfig({
  site: 'https://adrianmariscal.netlify.app', // ya lo usas para el sitemap
  integrations: [
    mdx(),
    sitemap(),
  ],
  vite: {
    plugins: [tailwind()],
  },
});
