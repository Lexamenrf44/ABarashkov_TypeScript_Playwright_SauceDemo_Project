import { test as base } from './AddCookies';

export const test = base.extend<{
  cookieLogin: void;
}>({
  cookieLogin: async ({ page, addSessionCookies }, use) => {
    await addSessionCookies;
    await page.goto(`${process.env.SAUCE_DEMO_BASE_URL}/inventory.html`);
    await use(undefined);
  },
});

export { expect } from '@playwright/test';