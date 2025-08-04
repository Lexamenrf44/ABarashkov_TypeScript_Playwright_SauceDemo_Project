import { test } from '../fixtures/CookieLogin';
import { filterOptions } from '../data/filterOptions';

test.describe('Filter tests', () => {
  test('Should filter price high to low', async ({ cookieLogin, inventoryPage }) => {
    const option = filterOptions.find(o => o.filterOption === 'Price (high to low)');
    await inventoryPage.filterByOption(option!);
    await inventoryPage.assertByOption(option!);
  });

  test('Should filter price low to high', async ({ cookieLogin, inventoryPage }) => {
    const option = filterOptions.find(o => o.filterOption === 'Price (low to high)');
    await inventoryPage.filterByOption(option!);
    await inventoryPage.assertByOption(option!);
  });

  test('Should filter by name A to Z', async ({ cookieLogin, inventoryPage }) => {
    const option = filterOptions.find(o => o.filterOption === 'Name (A to Z)');
    await inventoryPage.filterByOption(option!);
    await inventoryPage.assertByOption(option!);
  });

  test('Should filter by name Z to A', async ({ cookieLogin, inventoryPage }) => {
    const option = filterOptions.find(o => o.filterOption === 'Name (Z to A)');
    await inventoryPage.filterByOption(option!);
    await inventoryPage.assertByOption(option!);
  });
});