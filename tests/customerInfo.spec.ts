import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/login.page';
import { Inventory } from '../page-objects/inventory.page';
import { Cart } from '../page-objects/cart.page';
import { CustomerInfo } from '../page-objects/customerInfo.page';



test.describe('checking inventory & Info pages', () => {
    test.beforeEach(async ({ page }) => {
        const login = new LoginPage(page);
        await login.gotoLoginPage();
        await login.login('standard_user', 'secret_sauce');
        const inventory = new Inventory(page);
        await inventory.addItem('Sauce Labs Bolt T-Shirt');
        await inventory.clickShoppingCart();
        const checkoutCart = new Cart(page);
        await checkoutCart.clickCheckout();
    })

    test('User is not able to proceed if First Name is missing',async ({page}) =>{
        const info = new CustomerInfo(page);
        await info.enterCustomerInfo('', 'Polo', '92036');
        await expect (info.errorBox).toHaveText('Error: First Name is required');
    })

    test('User is not able to proceed if Last Name is missing',async ({page}) =>{
        const info = new CustomerInfo(page);
        await info.enterCustomerInfo('Marco', '', '92036');
        await expect (info.errorBox).toHaveText('Error: Last Name is required');
    })

    test('User is not able to proceed if Postal Code is missing',async ({page}) =>{
        const info = new CustomerInfo(page);
        await info.enterCustomerInfo('Marco', 'Polo', '');
        await expect (info.errorBox).toHaveText('Error: Postal Code is required');
    })

    test('User is able to click "Cancel" button to go 1 step back',async ({page}) =>{
        const info = new CustomerInfo(page);
        await info.customerInfoGoBack();
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    })

    test('User is able to click "Continue" to move forward', async ({page}) =>{
        const info = new CustomerInfo(page);
        await info.enterCustomerInfo('Marco', 'Polo', '92036');
        info.customerInfoContinue();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');

    })












})