import { expect, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { step } from '../../utils/decorators.utils';
import { LoginPage } from './LoginPage';
import { NavbarComponent } from '../components/navbar.component';
import { FilterComponent } from '../components/filter.component';
import { FilterOption } from '../../data/filterOptions';
import { CartModel } from '../../model/cartModel';

export class InventoryPage extends BasePage {

  private readonly navbar = new NavbarComponent(this.page);
  private readonly filterComponent = new FilterComponent(this.page);

  private readonly inventoryList: Locator = this.page.locator('.inventory_list');

  @step('Assert inventory page loaded')
  async waitUntilInventoryPageLoaded(): Promise<InventoryPage> {
    await this.assertPageUrl(`${process.env.SAUCE_DEMO_BASE_URL}`, '/inventory.html');
    await this.assertElementVisible(this.inventoryList);

    return this;
  }

  @step('Assert logout after cookies cleared and page reloaded')
  async assertUserLoggedOutAfterCookiesCleared(): Promise<LoginPage> {
    await this.clearBrowserCookies();
    await this.reloadPage();

    return new LoginPage(this.page).waitUntilLoginPageLoaded();
  }

  @step('Assert manual logout via navbar component on logout button')
  async assertUserLoggedOutAfterManualLogout(): Promise<LoginPage> {
    await this.navbar.openNavbarMenu();
    await this.navbar.clickLogoutButton();

    return new LoginPage(this.page).waitUntilLoginPageLoaded();
  }

  @step('Filter by option {optionFilter.filterOption}')
  async filterByOption(optionFilter: FilterOption): Promise<InventoryPage> {
    await this.filterComponent.filterByOption(optionFilter);

    return this;
  }

  @step('Assert that filtered by {optionFilter.filterOption} inventory items are equal to sortedItems by {optionFilter.filterOption}')
async assertByOption(optionFilter: FilterOption): Promise<InventoryPage> {
    const filteredInventoryItems = await this.getItemList();
    const sortedItems = [...filteredInventoryItems].sort(optionFilter.comparator);

    expect(filteredInventoryItems).toEqual(sortedItems);

    return this;
}
@step('Get list of inventory items')
async getItemList(): Promise<CartModel[]> {
    const itemLocators = await this.inventoryList.locator('.cart_item').all();
    return Promise.all(itemLocators.map(locator => CartModel.fromLocator(locator)));
}
}