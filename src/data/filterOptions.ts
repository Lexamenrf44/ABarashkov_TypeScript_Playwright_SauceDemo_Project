import { CartModel } from '../model/cartModel';
import { priceComparator } from '../utils/priceComparator';
import { titleComparator } from '../utils/titleComparator';

export type FilterOption = {
    filterOption: string;
    comparator: (a: CartModel, b: CartModel) => number;
};

export const filterOptions: FilterOption[] = [
    {
        filterOption: "Name (Z to A)",
        comparator: (a, b) => titleComparator(b, a)
    },
    {
        filterOption: "Price (high to low)",
        comparator: (a, b) => priceComparator(b, a)
    },
    {
        filterOption: "Name (A to Z)",
        comparator: titleComparator
    },
    {
        filterOption: "Price (low to high)",
        comparator: priceComparator
    }
];