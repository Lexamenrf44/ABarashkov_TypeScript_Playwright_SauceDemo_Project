import { expect, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { step } from '../../utils/decorators.utils';

export class InventoryPage extends BasePage {

  private readonly inventoryList = this.page.locator('.inventory_list');

  @step('Assert inventory page loaded')
  async waitUntilInventoryPageLoaded(): Promise<InventoryPage> {
    await this.assertPageUrl(`${process.env.SAUCE_DEMO_BASE_URL}`, '/inventory.html');
    await this.assertElementVisible(this.inventoryList);

    return this;
  }
}