import { CartModel } from '../model/cartModel';

export function priceComparator(a: CartModel, b: CartModel): number {
    if (a.price > b.price) {
        return 1;
    } else if (a.price < b.price) {
        return -1;
    } else {
        return 0;
    }
}

export function priceComparatorReversed(a: CartModel, b: CartModel): number {
    return priceComparator(b, a);
}