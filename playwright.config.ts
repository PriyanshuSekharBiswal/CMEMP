import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  workers: 1,
  timeout: 60000,
  use: {
    baseURL: "http://127.0.0.1:5194",
    browserName: "chromium",
    channel: "chrome",
    headless: true,
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm run dev",
    url: "http://127.0.0.1:5194",
    reuseExistingServer: false,
    timeout: 30000,
    env: {
      DATABASE_PATH: ":memory:",
      PORT: "3194",
      WEB_PORT: "5194",
      WEB_ORIGIN: "http://127.0.0.1:5194",
      DEMO_AUTH: "true",
      ADMIN_PASSWORD: "e2e-operations-password",
      ADMIN_PHONE: "9000000000",
    },
  },
});
