import { expect, test } from '@playwright/test';
import { LoginPage } from '../page-objects/login.page';
import { Inventory } from '../page-objects/inventory.page';
import { Cart } from '../page-objects/cart.page';
import { CustomerInfo } from '../page-objects/customerInfo.page';
import { Overview } from '../page-objects/overview.page';
import { Complete } from '../page-objects/complete.page';

test.describe('Placing an order', () => {
    test.beforeEach(async ({ page }) => {
        const login = new LoginPage(page);
        await login.gotoLoginPage();
        await login.login('standard_user', 'secret_sauce');
    })

    test('User adds fleece jacket to the cart and checks out', async ({ page }) => {
        //user adds fleece jacket to the cart
        const inventory = new Inventory(page);
        await inventory.addItem('Sauce Labs Fleece Jacket');
        await inventory.clickShoppingCart();
        // user navigates to Cart
        const cart = new Cart(page);
        await cart.clickCheckout();
        //user enters customer information
        const customerInfo = new CustomerInfo(page);
        await customerInfo.enterCustomerInfo('Marco', 'Polo', '92036');
        //user click 'Finish'
        const overview = new Overview(page);
        await overview.finishOrder();
        //user navigates to Inventory page
        const complete = new Complete(page);
        await complete.goBackHome();
        //verify user is on Inventory page
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    })




})

