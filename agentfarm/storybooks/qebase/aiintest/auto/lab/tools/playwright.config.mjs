import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: '../tests', testMatch: '*.spec.mjs', fullyParallel: true,
  retries: 0, timeout: 60000, outputDir: '../test-results',
  reporter: [['list']], use: { browserName: 'chromium', trace: 'retain-on-failure' },
});
