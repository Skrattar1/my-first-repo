import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';
import InventoryPage from '../pages/InventoryPage.js';
import CartPage from '../pages/CartPage.js';
import CheckoutStepOnePage from '../pages/CheckoutStepOnePage.js';
import CheckoutStepTwoPage from '../pages/CheckoutStepTwoPage.js';
import CheckoutCompletePage from '../pages/CheckoutCompletePage.js';

test('Complete purchase flow on SauceDemo', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);

    await loginPage.navigate();

    await loginPage.login('standard_user', 'secret_sauce');

    const pageTitle = await inventoryPage.getPageTitle();
    expect(pageTitle).toBe('Products');

    const addedItemName = await inventoryPage.addMostExpensiveItemToCart();

    const cartItemCount = await inventoryPage.getCartItemCount();
    expect(cartItemCount).toBe(1);

    await inventoryPage.openCart();

    const cartItemName = await cartPage.getItemName();
    expect(cartItemName).toBe(addedItemName);
    expect(await cartPage.getItemsCount()).toBe(1);

    await cartPage.goToCheckout();

    await checkoutStepOnePage.fillUserInfo('Test', 'User', '12345');
    await checkoutStepOnePage.continueToStepTwo();

    const reviewItemName = await checkoutStepTwoPage.getItemName();
    expect(reviewItemName).toBe(addedItemName);

    const totalAmount = await checkoutStepTwoPage.getTotalAmount();
    expect(totalAmount).toContain('$');

    await checkoutStepTwoPage.finishCheckout();

    const successMessage = await checkoutCompletePage.getCompletionMessage();
    expect(successMessage).toBe('Thank you for your order!');

    const isSuccessful = await checkoutCompletePage.isOrderSuccessful();
    expect(isSuccessful).toBeTruthy();
});

test('Login with invalid credentials shows error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login('invalid_user', 'wrong_password');

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Username and password do not match');
});