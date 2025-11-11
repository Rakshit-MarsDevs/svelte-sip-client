import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  preprocess: vitePreprocess(),
  // Missing compiler options
  compilerOptions: {
    // Wrong option name
    runes: true
  }
};
