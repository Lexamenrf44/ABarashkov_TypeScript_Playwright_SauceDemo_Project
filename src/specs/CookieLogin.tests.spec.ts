import { test } from '../fixtures/CookieLogin';
import { InventoryPage } from '../web/pages';

test.describe('Standard user cookie login tests', () => {
  test.describe('Default user cookie login tests', () => {
    test('Should successfully cookie authenticate with standard user', async ({ cookieLogin, inventoryPage, }) => {
      await inventoryPage.waitUntilInventoryPageLoaded();
    });
  });

  test.describe('Locked user cookie login tests', () => {
    test.use({ userType: 'locked' });
    test('Should not cookie authenticate with locked user', async ({ cookieLogin, loginPage }) => {
      await loginPage.assertUnauthorizedAccessAlertMessage();
    });
  });

  test.describe('Problem user cookie login tests', () => {
    test.use({ userType: 'problem' });
    test('Should successfully cookie authenticate with problem user', async ({ cookieLogin, inventoryPage }) => {
      await inventoryPage.waitUntilInventoryPageLoaded();
    });
  });

  test.describe('Glitch user cookie login tests', () => {
    test.use({ userType: 'glitch_user' });
    test('Should successfully cookie authenticate with glitch user', async ({ cookieLogin, inventoryPage }) => {
      await inventoryPage.waitUntilInventoryPageLoaded();
    });
  });

  test.describe('Error user cookie login tests', () => {
    test.use({ userType: 'error' });
    test('Should successfully cookie authenticate with cookies with error user', async ({ cookieLogin, inventoryPage }) => {
      await inventoryPage.waitUntilInventoryPageLoaded();
    });
  });

  test.describe('Visual user cookie login tests', () => {
    test.use({ userType: 'visual' });
    test('Should successfully cookie authenticate with visual user', async ({ cookieLogin, inventoryPage }) => {
      await inventoryPage.waitUntilInventoryPageLoaded();
    });
  });
});
