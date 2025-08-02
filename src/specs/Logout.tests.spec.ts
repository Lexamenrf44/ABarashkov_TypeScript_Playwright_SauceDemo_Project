import { test } from '../fixtures/CookieLogin';

test.describe('Logout tests', () => {
    test('Should logout after browser cookies cleared', async ({ cookieLogin, inventoryPage, loginPage }) => {
        await inventoryPage.waitUntilInventoryPageLoaded();
        await inventoryPage.assertUserLoggedOutAfterCookiesCleared();
        
    });

    test('Should logout manually via navigation sidebar component', async ({ cookieLogin, inventoryPage, loginPage }) => {
        await inventoryPage.waitUntilInventoryPageLoaded();
        await inventoryPage.assertUserLoggedOutAfterManualLogout();
    });
});