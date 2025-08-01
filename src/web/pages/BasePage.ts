import { Page, Locator, expect } from "@playwright/test";
import { step } from "../../utils/decorators.utils";

export class PageHolder {
    constructor(protected page: Page) {

    }

    @step('Navigate to {url}')
    async navigateTo(url: string): Promise<void> {
        await this.page.goto(url);
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

    @step(`Fill {locator} field with {text} text`)
    async fillSelector(locator: Locator, text: string): Promise<void> {
        await this.assertElementVisible(locator);
        await locator.fill(text);
    }
}

export abstract class Component extends PageHolder {

}

export abstract class BasePage extends PageHolder {

    @step('Assert page {baseHost} has {endpoint} endpoint')
    async assertPageUrl(baseHost: string, endpoint: string): Promise<void> {
        await expect(this.page).toHaveURL(`${baseHost}${endpoint}`);
        await this.page.waitForLoadState('networkidle');
    }

    @step(`Assert {locator} has {text} text`)
    async assertElementHasText(locator: Locator, text: string): Promise<void> {
        await expect(locator).toHaveText(text);
    }
}
