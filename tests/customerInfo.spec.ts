import { test, expect } from 'page-objects/fixture.page';


test.describe('checking inventory & Info pages', () => {
    test.beforeEach(async ({ loginPage, inventoryPage, cartPage }) => {
        test.info().annotations.push({ type: `GIVEN`, description: `user adds item to the cart and enters personal information` });
        await loginPage.gotoLoginPage();
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.addItem('Sauce Labs Bolt T-Shirt');
        await inventoryPage.clickShoppingCart();
        await cartPage.clickCheckout();
    })

    test('User is not able to proceed if First Name is missing', async ({ customerInfoPage }) => {
        await test.step(`WHEN user enters all info except First Name`, async () => {
            await customerInfoPage.enterCustomerInfo('', 'Polo', '92036');
        });
        await test.step(`THEN user receives an error 'First Name is required'`, async () => {
            await expect(customerInfoPage.errorBox).toHaveText('Error: First Name is required');
        });

    })

    test('User is not able to proceed if Last Name is missing @smoke', async ({ customerInfoPage }) => {
        await test.step(`WHEN user enters all info except Last Name`, async () => {
            await customerInfoPage.enterCustomerInfo('Marco', '', '92036');
        });
        await test.step(`THEN user receives an error 'Last Name is required'`, async () => {
            await expect(customerInfoPage.errorBox).toHaveText('Error: Last Name is required');
        });
    })

    test('User is not able to proceed if Postal Code is missing', async ({ customerInfoPage }) => {
        await test.step(`WHEN user enters all info except ZIP code`, async () => {
            await customerInfoPage.enterCustomerInfo('Marco', 'Polo', '');
        });
        await test.step(`THEN user receives an error 'Postal Code is required'`, async () => {
            await expect(customerInfoPage.errorBox).toHaveText('Error: Postal Code is required');
        });
    })

    test('User is able to click "Cancel" button to go 1 step back', async ({ customerInfoPage, page }) => {
        await test.step(`WHEN user clicks "Cancel" button`, async () => {
            await customerInfoPage.customerInfoGoBack();
        });
        await test.step(`THEN user is navigated to the cart page`, async () => {
            await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
        });
    })

    test('User is able to click "Continue" to move forward', async ({ page, customerInfoPage }) => {
        await test.step(`WHEN user clicks "Continue" button`, async () => {
            await customerInfoPage.enterCustomerInfo('Marco', 'Polo', '92036');
        });
        await test.step(`THEN user is on Overview page`, async () => {
            customerInfoPage.customerInfoContinue();
            await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
        });
    })


})