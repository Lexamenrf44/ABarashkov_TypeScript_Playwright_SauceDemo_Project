import { test } from '../fixtures/CookieLogin';

test('Should successfully authenticate with cookies', async ({ page, inventoryPage, cookieLogin }) => {
  await inventoryPage.waitUntilInventoryPageLoaded();
});