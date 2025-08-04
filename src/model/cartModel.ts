import { Locator } from '@playwright/test';

export class CartModel {
    title: string;
    description: string;
    price: number;

    constructor(element: Locator) {
        this.title = '';
        this.description = '';
        this.price = 0;
    }

    static async fromLocator(element: Locator): Promise<CartModel> {
        const model = new CartModel(element);
        
        model.title = await element.locator("[data-test='inventory-item-name']").textContent() ?? '';
        
        model.description = await element.locator("[data-test='inventory-item-desc']").textContent() ?? '';
        
        const priceText = await element.locator("[data-test='inventory-item-price']").textContent() ?? '0';
        
        model.price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
        
        return model;
    }
}