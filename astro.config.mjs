// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages project site. Internal links use BASE_URL.
  site: 'https://ireaching.github.io',
  base: '/portfolio',

  output: 'static',

  vite: {
    plugins: [tailwindcss()],
  },

  trailingSlash: 'always',
  integrations: [
    mdx(),
    sitemap({ filter: (page) => !/\/404(?:\/|\.html)?$/.test(page) }),
  ],
});
