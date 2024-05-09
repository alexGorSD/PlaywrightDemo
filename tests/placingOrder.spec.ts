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
        const addJacket = new Inventory(page);
        await addJacket.addItem('Sauce Labs Fleece Jacket');
        await addJacket.clickShoppingCart();
        // user navigates to Cart
        const checkoutCart = new Cart(page);
        await checkoutCart.clickCheckout();
        //user enters customer information
        const info = new CustomerInfo(page);
        await info.enterCustomerInfo('Marco', 'Polo', '92036');
        //verify user is on Overview page
        await expect(page.getByText('Checkout: Overview')).toBeVisible();
        await expect(page.getByText('Sauce Labs Fleece Jacket')).toBeVisible();
        await expect(page.getByText('Price Total')).toBeVisible();
        await expect(page.getByText('Total: $53.99')).toBeVisible();
        //user click 'Finish'
        const clickFinish = new Overview(page);
        await clickFinish.finishOrder();
        //verify user is on Complete page
        await expect(page.getByText('Checkout: Complete!')).toBeVisible();
        await expect(page.getByAltText('Pony Express')).toBeVisible();
        await expect(page.getByText('Checkout: Complete!')).toBeVisible();
        await expect(page.getByText('Thank you for your order!')).toBeVisible();
        await expect(page.getByText('Your order has been dispatched')).toBeVisible();
        //user navigates to Inventory page
        const goBackHome = new Complete(page);
        await goBackHome.goBackHome();
        //verify user is on Inventory page
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    })




})

