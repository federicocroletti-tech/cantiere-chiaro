const path = require('path');
const { defineConfig } = require('@playwright/test');
const port = Number(process.env.FAMILYTREE_PORT) || 4187;

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    headless: true
  },
  webServer: {
    command: `npx http-server . -p ${port} -c-1`,
    cwd: path.resolve(__dirname),
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: false,
    timeout: 120000
  }
});
