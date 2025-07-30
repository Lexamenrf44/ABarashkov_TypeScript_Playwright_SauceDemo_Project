import { test as base } from './BaseTest';

export const test = base.extend<{
  cookieLogin: void;
}>({
  cookieLogin: async ({ page }, use) => {
    await page.context().addCookies([
      {
        name: 'session-username',
        value: 'standard_user',
        domain: 'www.saucedemo.com',
        path: '/',
      },
    ]);
    await page.goto(`${process.env.SAUCE_DEMO_BASE_URL}/inventory.html`);
    await use(undefined);
  },
});

export { expect } from '@playwright/test';