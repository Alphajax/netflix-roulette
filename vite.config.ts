import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // ✅ Ensure globals like expect, test, and describe are available
    environment: 'jsdom',
  },
})
