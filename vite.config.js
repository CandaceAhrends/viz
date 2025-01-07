import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    hots: '0.0.0.0',
  },
  test: {
    global: true,
    rootDir: './__tests__/vi-tests',
    environment: 'jsdom',
    setupFiles: './setupTest.js',
    exclude: [
      './__tests__/jest-tests/**/*',
      './e2e/**/*',
      '**/node_modules/**',
    ],
  },
  build: {
    sourcemap: true, // Enable source maps for builds
  },
});
