import { test } from '../fixtures/CookieLogin';

test.describe('Manual login tests', () => { 
    test('Should successfully authenticate with standard user', async ({ page, loginPage, inventoryPage }) => {
        await loginPage.manualAuthentication();
    });

    test('Should not authenticate with invalid username and password', async ({ page, loginPage }) => {
        await loginPage.assertInvalidUsernameAndPasswordAlertMessage();
    });

    test('Should not authenticate with empty username', async ({ page, loginPage }) => {
        await loginPage.assertEmptyUsernameAlertMessage();
    });

    test('Should not authenticate with empty password', async ({ page, loginPage }) => {
        await loginPage.assertEmptyPasswordAlertMessage();
    });

    test('Should not authenticate with locked user', async ({ page, loginPage }) => {
        await loginPage.assertLockedOutUserAlertMessage();
    });
});