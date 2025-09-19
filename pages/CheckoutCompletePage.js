import { expect } from '@playwright/test';

export class CheckoutCompletePage {
    constructor(page) {
        this.page = page;
        this.completionMessage = page.locator('.complete-header');
        this.completionText = page.locator('.complete-text');
        this.backHomeButton = page.locator('#back-to-products');
    }

    async getCompletionMessage() {
        return await this.completionMessage.textContent();
    }

    async getCompletionText() {
        return await this.completionText.textContent();
    }

    async backToHome() {
        await this.backHomeButton.click();
    }

    async isOrderSuccessful() {
        const message = await this.getCompletionMessage();
        return message === 'Thank you for your order!';
    }
}

export default CheckoutCompletePage;