import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/login.page';
import { Inventory } from '../page-objects/inventory.page';
import { Cart } from '../page-objects/cart.page';
import { CustomerInfo } from '../page-objects/customerInfo.page';



test.describe('checking inventory & Info pages', () => {
    test.beforeEach(async ({ page }) => {
        test.info().annotations.push({ type: `GIVEN`, description: `user adds item to the cart and enters personal information` });
        const login = new LoginPage(page);
        await login.gotoLoginPage();
        await login.login('standard_user', 'secret_sauce');
        const inventory = new Inventory(page);
        await inventory.addItem('Sauce Labs Bolt T-Shirt');
        await inventory.clickShoppingCart();
        const checkoutCart = new Cart(page);
        await checkoutCart.clickCheckout();
    })

    test('User is not able to proceed if First Name is missing', async ({ page }) => {
        const customerInfo = new CustomerInfo(page);
        await test.step(`WHEN user enters all info except First Name`, async () => {
            await customerInfo.enterCustomerInfo('', 'Polo', '92036');
        });
        await test.step(`THEN user receives an error 'First Name is required'`, async () => {
            await expect(customerInfo.errorBox).toHaveText('Error: First Name is required');
        });

    })

    test('User is not able to proceed if Last Name is missing', async ({ page }) => {
        const customerInfo = new CustomerInfo(page);
        await test.step(`WHEN user enters all info except Last Name`, async () => {
            await customerInfo.enterCustomerInfo('Marco', '', '92036');
        });
        await test.step(`THEN user receives an error 'Last Name is required'`, async () => {
            await expect(customerInfo.errorBox).toHaveText('Error: Last Name is required');
        });
    })

    test('User is not able to proceed if Postal Code is missing', async ({ page }) => {
        const customerInfo = new CustomerInfo(page);
        await test.step(`WHEN user enters all info except ZIP code`, async () => {
            await customerInfo.enterCustomerInfo('Marco', 'Polo', '');
        });
        await test.step(`THEN user receives an error 'Postal Code is required'`, async () => {
            await expect(customerInfo.errorBox).toHaveText('Error: Postal Code is required');
        });
    })

    test('User is able to click "Cancel" button to go 1 step back', async ({ page }) => {
        const customerInfo = new CustomerInfo(page);
        await test.step(`WHEN user clicks "Cancel" button`, async () => {
        await customerInfo.customerInfoGoBack();
        });
        await test.step(`THEN user is navigated to the cart page`, async () => {
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
        });
    })

    test('User is able to click "Continue" to move forward', async ({ page }) => {
        const customerInfo = new CustomerInfo(page);
        await test.step(`WHEN user clicks "Continue" button`, async () => {
        await customerInfo.enterCustomerInfo('Marco', 'Polo', '92036');
        });
        await test.step(`THEN user is on Overview page`, async () => {
        customerInfo.customerInfoContinue();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
        });
    })


})