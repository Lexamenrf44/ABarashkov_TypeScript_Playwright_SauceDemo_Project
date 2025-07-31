import { Page, Locator, expect } from "@playwright/test";
import { step } from "../../utils/decorators.utils";

export class PageHolder {
    constructor(protected page: Page) {

    }

    @step(`Assert {locator} visible`)
    async assertElementVisible(locator: Locator): Promise<void> {
        await expect(locator).toBeVisible();
    }

    @step(`Click on {locator} locator`)
    async clickSelector(locator: Locator): Promise<void> {
        await this.assertElementVisible(locator);
        await locator.click();
    }
}

export abstract class Component extends PageHolder {

}

export abstract class BasePage extends PageHolder {

    @step('Assert page {baseHost} has {endpoint} endpoint')
    async assertPageUrl(baseHost: string, endpoint: string): Promise<void> {
        await expect(this.page).toHaveURL(`${baseHost}${endpoint}`);
    }

    @step(`Assert {locator} has {text} text`)
    async assertElementHasText(locator: Locator, text: string): Promise<void> {
        await expect(locator).toHaveText(text);
    }
}
