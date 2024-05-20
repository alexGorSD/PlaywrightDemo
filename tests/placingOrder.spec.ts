import { expect, test } from '../page-objects/fixture.page';


test.describe('Placing an order', () => {
    test.beforeEach(async ({ loginPage }) => {
        const userName = 'standard_user';
        const password = 'secret_sauce';
        test.info().annotations.push({ type: 'GIVEN', description: `I'm logged in as ${userName}` });
        await loginPage.gotoLoginPage();
        await loginPage.login(userName, password);
    })

    test('User adds fleece jacket to the cart and checks out', async ({ page, inventoryPage, cartPage, customerInfoPage, overviewPage, completePage }) => {
        //user adds fleece jacket to the cart
        await inventoryPage.addItem('Sauce Labs Fleece Jacket');
        await inventoryPage.clickShoppingCart();
        // user navigates to Cart
        await cartPage.clickCheckout();
        //user enters customer information
        await customerInfoPage.enterCustomerInfo('Marco', 'Polo', '92036');
        //user click 'Finish'
        await overviewPage.finishOrder();
        //user navigates to Inventory page
        await test.step('THEN user placed the order successfully', async () => {
            await completePage.goBackHome();
            //verify user is on Inventory page
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        });
    })


})

