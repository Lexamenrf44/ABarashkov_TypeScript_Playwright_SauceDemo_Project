import { test } from '../fixtures/CookieLogin';
import { filterOptions } from '../data/filterOptions';

Object.entries(filterOptions).forEach(([key, val]) => {
    test.describe(`Filter option: ${key}`, () => {
        test(`Should filter inventory list by the "${val.filterOption}" filter option`, async ({ page, cookieLogin, inventoryPage }) => {
            await inventoryPage.waitUntilInventoryPageLoaded();
            await inventoryPage.filterByOption(val.filterOption);
            await page.waitForTimeout(3000); // for visual debugging
            await inventoryPage.assertByOption(val);
        });
    });
});