import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@backend': path.resolve(__dirname, './src/backend'),
      '@frontend': path.resolve(__dirname, './src/frontend'),
      '@shared': path.resolve(__dirname, './src/shared'),
    },
  },
  test: {
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: [
        'src/backend/handlers/**',
        'src/backend/services/**',
        'src/backend/repositories/**',
        'src/backend/utils/**',
        'src/lib/permissions/**',
        'src/lib/api/**',
      ],
      exclude: ['src/**/__tests__/**', 'src/test-utils/**'],
    },
  },
});
