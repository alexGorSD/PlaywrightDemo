import { expect, test } from '@playwright/test';
import { LoginPage } from '../page-objects/login.page';
import { Inventory } from '../page-objects/inventory.page';
import { Cart } from '../page-objects/cart.page';
import { CustomerInfo } from '../page-objects/customerInfo.page';
import { Overview } from '../page-objects/overview.page';


test.describe('checking Overview page', () => {
    test.beforeEach(async ({ page }) => {
        const login = new LoginPage(page);
        await login.gotoLoginPage();
        await login.login('standard_user', 'secret_sauce');
        const inventory = new Inventory(page);
        await inventory.addItem('Sauce Labs Bolt T-Shirt');
        await inventory.clickShoppingCart();
        const cart = new Cart(page);
        await cart.clickCheckout();
        const customerInfo = new CustomerInfo(page);
        await customerInfo.enterCustomerInfo('Marco', 'Polo', '92036');
    })

    test('User is able to verify Payments,Shipping, and Price', async ({ page }) => {
        const overview = new Overview(page);
        await expect.soft(overview.payInfoValue).toHaveText('SauceCard #31337');
        await expect.soft(overview.shippingInfoValue).toHaveText('Free Pony Express Delivery!');
        await expect.soft(overview.subtotalValue).toHaveText('Item total: $15.99');
        await expect.soft(overview.taxValue).toHaveText('Tax: $1.28');
        await expect(overview.totalValue).toHaveText('Total: $17.27');
    })

    test('User is able to click "Cancel" to go back to inventory page1', async ({ page }) => {
        const overview = new Overview(page);
        await overview.cancelOrder();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    })


})