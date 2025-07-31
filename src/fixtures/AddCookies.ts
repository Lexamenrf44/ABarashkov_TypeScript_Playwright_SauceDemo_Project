import { test as base } from './BaseTest';
import { UserType, userMappings } from '../data/userIndices';

export const test = base.extend<{
  userType: UserType;
  addSessionCookies: void;
}>({
  userType: [ 'standard', { option: true } ],

  addSessionCookies: async ({ page, userType }, use) => {
    const { usernameKey } = userMappings[userType];
    const username = process.env[usernameKey] || 'standard_user';

    await page.context().addCookies([
      {
        name: 'session-username',
        value: username,
        domain: 'www.saucedemo.com',
        path: '/',
      },
    ]);
    await use(undefined);
  },
});

export { expect } from '@playwright/test';