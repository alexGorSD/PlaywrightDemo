import { expect, test } from '../page-objects/fixture.page';


test.describe('checking Overview page', () => {
    test.beforeEach(async ({ loginPage, inventoryPage, cartPage, customerInfoPage }) => {
        test.info().annotations.push({ type: `GIVEN`, description: `user adds item to the cart and enters personal information` });
        await loginPage.gotoLoginPage();
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.addItem('Sauce Labs Bolt T-Shirt');
        await inventoryPage.clickShoppingCart();
        await cartPage.clickCheckout();
        await customerInfoPage.enterCustomerInfo('Marco', 'Polo', '92036');
    })

    test('User is able to verify Payments,Shipping, and Price', async ({ overviewPage }) => {
        await test.step('THEN user is able to verify Payments,Shipping, and Price info', async () => {
            await expect.soft(overviewPage.payInfoValue).toHaveText('SauceCard #31337');
            await expect.soft(overviewPage.shippingInfoValue).toHaveText('Free Pony Express Delivery!');
            await expect.soft(overviewPage.subtotalValue).toHaveText('Item total: $15.99');
            await expect.soft(overviewPage.taxValue).toHaveText('Tax: $1.28');
            await expect(overviewPage.totalValue).toHaveText('Total: $17.27');
        });
    })

    test('User is able to click "Cancel" to go back to inventory page', async ({ overviewPage, page }) => {
        await test.step(`WHEN user clicks 'Cancel' button`, async () => {
            await overviewPage.cancelOrder();
        });
        await test.step(`THEN user is navigated to inventory page`, async () => {
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        });
    })


})