import { Component } from '../pages/BasePage';
import { step } from '../../utils/decorators.utils';
import { Locator } from '@playwright/test';

export class NavbarComponent extends Component {

  private readonly navbarBurgerMenuButton: Locator = this.page.locator('.bm-burger-button');

  private readonly navbarLeftSidebarSliderMenu: Locator = this.page.locator('.bm-menu-wrap');
  private readonly navbarCloseSidebarButton: Locator = this.page.locator('.bm-cross-button');
  private readonly navbarAllItemsButton: Locator = this.page.locator('[data-test="inventory-sidebar-link"]');
  private readonly navbarAboutButton: Locator = this.page.locator('[data-test="about-sidebar-link"]');
  private readonly navbarLogoutButton: Locator = this.page.locator('[data-test="logout-sidebar-link"]');
  private readonly navbarResetAppStateButton: Locator = this.page.locator('[id="reset_sidebar_link"]');

  @step('Wait for navbar to be visible')
  async waitForNavbarVisible(): Promise<NavbarComponent> {
    await this.assertElementVisible(this.navbarLeftSidebarSliderMenu);

    return this;
  }

  @step('Assert navbar is not visible')
  async assertNavbarNotVisible(): Promise<NavbarComponent> {
    await this.assertElementIsNotVisible(this.navbarLeftSidebarSliderMenu);

    return this;
  }

  @step('Should open navbar menu')
  async openNavbarMenu(): Promise<NavbarComponent> {
    await this.clickSelector(this.navbarBurgerMenuButton);

    return this.waitForNavbarVisible();
  }

  @step('Should close navbar menu')
  async closeNavbarMenu(): Promise<NavbarComponent> {
    await this.clickSelector(this.navbarCloseSidebarButton);
    await this.assertElementVisible(this.navbarBurgerMenuButton);

    return this.assertNavbarNotVisible();
  }

  @step('Click logout button from navigation bar')
  async clickLogoutButton(): Promise<void> {
    await this.clickSelector(this.navbarLogoutButton);
  }

  @step('Click reset app state button from navigation bar')
  async clickResetAppStateButton(): Promise<void> {
    await this.clickSelector(this.navbarResetAppStateButton);
  }
}