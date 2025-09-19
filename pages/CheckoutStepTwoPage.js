import { expect } from '@playwright/test';

export class CheckoutStepTwoPage {
    constructor(page) {
        this.page = page;
        this.inventoryItemName = page.locator('.inventory_item_name');
        this.paymentInfo = page.locator('.summary_value_label').first();
        this.shippingInfo = page.locator('.summary_value_label').nth(1);
        this.itemTotal = page.locator('.summary_subtotal_label');
        this.tax = page.locator('.summary_tax_label');
        this.total = page.locator('.summary_total_label');
        this.finishButton = page.locator('#finish');
        this.cancelButton = page.locator('#cancel');
    }

    async getItemName() {
        return await this.inventoryItemName.textContent();
    }

    async getTotalAmount() {
        return await this.total.textContent();
    }

    async finishCheckout() {
        await this.finishButton.click();
    }

    async cancelCheckout() {
        await this.cancelButton.click();
    }
}

export default CheckoutStepTwoPage;