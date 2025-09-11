import { expect } from '@playwright/test';

export class CartPage {
    constructor(page) {
        this.page = page;
        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.locator('#checkout');
        this.continueShoppingButton = page.locator('#continue-shopping');
    }

    async getItemName(index = 0) {
        const items = await this.cartItems.all();
        if (items.length > index) {
            const itemName = items[index].locator('.inventory_item_name');
            return await itemName.textContent();
        }
        return null;
    }

    async getItemsCount() {
        return await this.cartItems.count();
    }

    async goToCheckout() {
        await this.checkoutButton.click();
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
    }
}

export default CartPage;