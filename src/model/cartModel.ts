import { Locator } from '@playwright/test';

export class CartModel {
    private title: string;
    private description: string;
    private price: number;

    constructor(title: string, description: string, price: number) {
        this.title = title;
        this.description = description;
        this.price = price;
    }

    getTitle(): string {
        return this.title;
    }

    getDescription(): string {
        return this.description;
    }

    getPrice(): number {
        return this.price;
    }

    static async fromLocator(element: Locator): Promise<CartModel> {
        const title = await element.locator("[data-test='inventory-item-name']").textContent() ?? '';
        const description = await element.locator("[data-test='inventory-item-desc']").textContent() ?? '';
        const priceText = await element.locator("[data-test='inventory-item-price']").textContent() ?? '0';
        const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));

        return new CartModel(title, description, price);
    }
}