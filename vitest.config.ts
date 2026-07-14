// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Load the test env variables
    env: {
      NODE_ENV: 'test',
    },
    // Tell Vitest to run this setup file before executing any test files
    setupFiles: ['./src/tests/setup.ts'],
    // Force tests to run sequentially to avoid transaction collisions
    // when using the same database connection pool
    fileParallelism: false,
    exclude: ['node_modules', 'dist'],
  },
});
