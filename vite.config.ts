import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    open: true,
  },
});
