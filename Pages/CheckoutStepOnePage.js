import { expect } from '@playwright/test';

export class CheckoutStepOnePage {
    constructor(page) {
        this.page = page;
        this.firstNameInput = page.locator('#first-name');
        this.lastNameInput = page.locator('#last-name');
        this.postalCodeInput = page.locator('#postal-code');
        this.continueButton = page.locator('#continue');
        this.cancelButton = page.locator('#cancel');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async fillUserInfo(firstName, lastName, postalCode) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async continueToStepTwo() {
        await this.continueButton.click();
    }

    async cancelCheckout() {
        await this.cancelButton.click();
    }

    async getErrorMessage() {
        return await this.errorMessage.textContent();
    }
}

export default CheckoutStepOnePage;