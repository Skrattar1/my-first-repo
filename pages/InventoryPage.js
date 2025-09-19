import { expect } from '@playwright/test';

export class InventoryPage {
    constructor(page) {
        this.page = page;
        this.pageTitle = page.locator('.title');
        this.cartIcon = page.locator('.shopping_cart_link');
        this.inventoryItems = page.locator('.inventory_item');
        this.sortDropdown = page.locator('.product_sort_container');
    }

    async getPageTitle() {
        return await this.pageTitle.textContent();
    }

    async addMostExpensiveItemToCart() {
        // Сортируем товары от дорогих к дешевым
        await this.sortDropdown.selectOption('hilo');

        // Ждем обновления списка товаров
        await this.page.waitForTimeout(1000);

        // Получаем все товары после сортировки
        const items = await this.inventoryItems.all();

        if (items.length > 0) {
            // Берем первый (самый дорогой) товар
            const firstItem = items[0];
            const itemNameElement = firstItem.locator('.inventory_item_name');
            const itemName = await itemNameElement.textContent();

            // Добавляем в корзину
            const addToCartButton = firstItem.locator('button').getByText('Add to cart');
            await addToCartButton.click();

            return itemName;
        }

        throw new Error('No items found on inventory page');
    }

    async openCart() {
        await this.cartIcon.click();
    }

    async getCartItemCount() {
        const cartBadge = this.page.locator('.shopping_cart_badge');
        if (await cartBadge.isVisible()) {
            return parseInt(await cartBadge.textContent());
        }
        return 0;
    }
}

export default InventoryPage;