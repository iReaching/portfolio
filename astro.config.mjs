// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  // For a project site like https://ireaching.github.io/portfolio, uncomment:
  site: 'https://ireaching.github.io',
  base: '/portfolio',

  output: 'static',

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [mdx()],
});
