import { CartModel } from '../model/cartModel';

export function titleComparator(a: CartModel, b: CartModel): number {
    return a.getTitle().localeCompare(b.getTitle());
}

export function titleComparatorReversed(a: CartModel, b: CartModel): number {
    return titleComparator(b, a);
}