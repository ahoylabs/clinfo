import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: 'jsdom',
    coverage: { include: ['src/**/*.{ts,tsx}'], all: true },
    deps: {
      moduleDirectories: ['node_modules'],
    },
    hookTimeout: 180000,
    testTimeout: 180000, // for windows, increase timeout
  },
})
