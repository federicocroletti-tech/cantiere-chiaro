const path = require('path');
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: {
    baseURL: 'http://127.0.0.1:4187',
    headless: true
  },
  webServer: {
    command: 'npx http-server . -p 4187 -c-1',
    cwd: path.resolve(__dirname),
    url: 'http://127.0.0.1:4187',
    reuseExistingServer: false,
    timeout: 120000
  }
});
