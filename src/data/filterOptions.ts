import { CartModel } from '../model/cartModel';
import { priceComparator } from '../utils/priceComparator';
import { titleComparator } from '../utils/titleComparator';

export type FilterOption = {
    filterOption: string;
    comparator: (a: CartModel, b: CartModel) => number;
};

export const filterOptions = {
    NAME_Z_TO_A: {
        filterOption: "Name (Z to A)",
        comparator: (a, b) => titleComparator(b, a)
    },

    PRICE_HIGH_TO_LOW: {
        filterOption: "Price (high to low)",
        comparator: (a, b) => priceComparator(b, a)
    },

    NAME_A_TO_Z: {
        filterOption: "Name (A to Z)",
        comparator: titleComparator
    },
    
    PRICE_LOW_TO_HIGH: {
        filterOption: "Price (low to high)",
        comparator: priceComparator
    }
}

export type FilterOptions = keyof typeof filterOptions;