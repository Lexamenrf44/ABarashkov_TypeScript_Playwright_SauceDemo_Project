import { CartModel } from '../model/cartModel';

export function titleComparator(a: CartModel, b: CartModel): number {
    return a.title.localeCompare(b.title);
}

export function titleComparatorReversed(a: CartModel, b: CartModel): number {
    return titleComparator(b, a);
}