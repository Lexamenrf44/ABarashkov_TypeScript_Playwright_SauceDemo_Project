import { Page, Locator, expect } from "@playwright/test";
import { step } from "../../utils/decorators.utils";
import { CartModel } from "../../model/cartModel";
import { FilterOption } from "../../data/filterOptions";

export abstract class PageHolder {
    constructor(protected page: Page) {

    }

    @step(`Assert {locator} visible`)
    async assertElementVisible(locator: Locator): Promise<void> {
        await expect(locator).toBeVisible();
    }

    @step(`Assert {locator} is not visible`)
    async assertElementIsNotVisible(locator: Locator): Promise<void> {
        await expect(locator).not.toBeVisible();
    }

    @step(`Should click on {locator} locator`)
    async clickSelector(locator: Locator): Promise<void> {
        await this.assertElementVisible(locator);
        await locator.click();
    }

    @step('Should reload page')
    async reloadPage(): Promise<void> {
        await this.page.reload();
    }
}

export abstract class Component extends PageHolder {

}

export abstract class BasePage extends PageHolder {

    @step('Should clear all browser cookies')
    async clearBrowserCookies(): Promise<void> {
        await this.page.context().clearCookies();
    }

    @step('Should navigate to {url}')
    async navigateTo(url: string): Promise<void> {
        await this.page.goto(url);
    }

    @step(`Should fill {locator} field with {text} text`)
    async fillSelector(locator: Locator, text: string): Promise<void> {
        await this.assertElementVisible(locator);
        await locator.fill(text);
    }

    @step('Assert page {baseHost} has {endpoint} endpoint')
    async assertPageUrl(baseHost: string, endpoint: string): Promise<void> {
        await expect(this.page).toHaveURL(`${baseHost}${endpoint}`);
        await this.page.waitForLoadState('networkidle');
    }

    @step(`Assert {locator} has {text} text`)
    async assertElementHasText(locator: Locator, text: string): Promise<void> {
        await expect(locator).toHaveText(text);
    }

    @step('Assert inventory items are sorted by "{optionFilter.filterOption}"')
    async assertItemsSortedByOption(items: CartModel[], optionFilter: FilterOption): Promise<void> {
        expect(items).toEqual([...items].sort(optionFilter.comparator));
    }
}
