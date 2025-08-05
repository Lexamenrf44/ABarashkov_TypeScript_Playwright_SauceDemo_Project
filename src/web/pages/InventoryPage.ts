import { Locator } from '@playwright/test';
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
  private readonly inventoryItems: Locator = this.inventoryList.locator('.inventory_item');

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

  @step('Filter by the "{optionFilter}" filter option')
  async filterByOption(optionFilter: string): Promise<InventoryPage> {
    await this.filterComponent.filterByOption(optionFilter);

    return this;
  }

  @step('Assert that filtered by "{optionFilter.filterOption}" inventory items are equal to sorted items by "{optionFilter.filterOption}" from cartModel')
  async assertByOption(optionFilter: FilterOption): Promise<InventoryPage> {
    const items = await this.getItemList();
    await this.assertItemsSortedByOption(items, optionFilter);

    return this;
  }

  @step('Get list of inventory items')
  async getItemList(): Promise<CartModel[]> {
    return Promise.all(
      (await this.inventoryItems.all()).map(locator => CartModel.fromLocator(locator))
    );
  }
}