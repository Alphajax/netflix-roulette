/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: ['**/index.ts'],
      provider: 'v8',
    },
    clearMocks: true,
  },
  server: {
    host: true,
    port: 3000,
  },
})
