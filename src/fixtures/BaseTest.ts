import { test as base } from '@playwright/test';

import {

    LoginPage, 
    InventoryPage

} from '../web/pages';

type HubFixture = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
}

export const test = base.extend<HubFixture>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    inventoryPage: async ({ page }, use) => {
        await use(new InventoryPage(page));
    }
})