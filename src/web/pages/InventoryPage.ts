import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { step } from '../../utils/decorators.utils';
import { LoginPage } from './LoginPage';
import { NavbarComponent } from '../components/navbar.component';

export class InventoryPage extends BasePage {

  private readonly navbar = new NavbarComponent(this.page);

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
}