import { Locator } from '@playwright/test';
import { step } from '../../utils/decorators.utils';
import { Component } from '../pages/BasePage';

export class FilterComponent extends Component {
    private readonly self: Locator = this.page.locator("[data-test='product-sort-container']");

    @step('Filter inventory items by filter option')
    async filterByOption(optionFilter: string): Promise<void> {
        await this.self.selectOption(optionFilter);
    }
}