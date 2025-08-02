import { test } from '../fixtures/CookieLogin';

test.describe('Logout tests', () => {
    test('User should be able to logout', async ({ cookieLogin, inventoryPage, loginPage }) => {
        await inventoryPage.waitUntilInventoryPageLoaded();
        await inventoryPage.assertUserLoggedOutAfterCookiesCleared();
        
    });

    test('User should be able to logout manually', async ({ cookieLogin, inventoryPage, loginPage }) => {
        await inventoryPage.waitUntilInventoryPageLoaded();
        await inventoryPage.assertUserLoggedOutAfterManualLogout();
    });
});