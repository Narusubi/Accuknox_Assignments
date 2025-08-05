import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testMatch: ['tests/userManagement.spec.ts'],
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 30 * 1000,
    navigationTimeout: 30 * 1000,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    baseURL: 'https://opensource-demo.orangehrmlive.com',
  },
  reporter: [
    ['dot'],
    ['json', { outputFile: 'jsonReports/jsonReport.json' }],
    ['html', { open: 'never' }]
  ]
};

export default config;


