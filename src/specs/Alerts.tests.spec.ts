import { alertTypes } from '../data/alertTypes';
import { test } from '../fixtures/CookieLogin';

Object.entries(alertTypes).forEach(([key, val]) => {
    test.describe(`Assert alert message by ${key} key test`, () => {
        test(`Should display the correct alert message for ${key}`, async ({ loginPage }) => {
            await loginPage.navigateToLoginPage();
            await loginPage.waitUntilLoginPageLoaded();

            if (val.flowType === 'empty') {
                await loginPage.submitEmptyCredentials();

            } else if (val.flowType === 'no_username') {
                await loginPage.submitInvalidUsername();

            } else if (val.flowType === 'no_password') {
                await loginPage.submitInvalidPassword();

            } else if (val.flowType === 'invalid') {
                await loginPage.submitInvalidCredentials();

            } else if (val.flowType === 'locked') {
                await loginPage.submitLockedUsername();

            } else if (val.flowType === 'unauthorized') {
                await loginPage.navigateToInventoryPage();
            }

            await loginPage.assertAlertMessageDisplayed(val.alertMessage);
        });
    });
});