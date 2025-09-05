const { test, expect } = require('@playwright/test');

test.describe('Авторизация на Sauce Demo', () => {
    test ('Пользователь должен успешно войти в систему', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator('#user-name').fill('standart_user');
        await page.locator('[placeholder="Password"]');
        await page.locator('[data-test="login-button"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });
});

test.describe('Ошибка авторизации на Sauce Demo', () => {
    test ('Пользователь не может успешно войти в систему', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator('#user-name').fill('locked_out_user');
        await page.locator('[placeholder="secret_sauce"]');
        await page.locator('[data-test="login-button"]').click();
        const errorMessage = page.locator('[data-test="error"]');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    });
});