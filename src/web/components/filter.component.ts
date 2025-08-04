import { Locator } from '@playwright/test';
import { step } from '../../utils/decorators.utils';
import { FilterOption } from '../../data/filterOptions';
import { Component } from '../pages/BasePage';

export class FilterComponent extends Component {
    private readonly self: Locator = this.page.locator("[data-test='product-sort-container']");

    @step('Filter inventory items by {option.filterOption}')
    async filterByOption(optionFilter: FilterOption): Promise<void> {
        await this.self.selectOption({ label: optionFilter.filterOption });
    }
}