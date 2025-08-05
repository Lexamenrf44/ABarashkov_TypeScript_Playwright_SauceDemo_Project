import { test } from '../fixtures/CookieLogin';
import { filterOptions } from '../data/filterOptions';

Object.entries(filterOptions).forEach(([key, val]) => {
    test.describe(`Filter option by ${key} key test`, () => {
        test(`Should filter inventory list by the "${val.filterOption}" filter option`, async ({ cookieLogin, inventoryPage }) => {
            await inventoryPage.waitUntilInventoryPageLoaded();
            await inventoryPage.filterByOption(val.filterOption);
            await inventoryPage.assertByOption(val);
        });
    });
});