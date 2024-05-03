import { expect, test } from '@playwright/test';
import { LoginPage } from '../page-objects/login.page';
import { Inventory } from '../page-objects/inventory.page';
import { Cart } from '../page-objects/cart.page';
import { yourInfo } from '../page-objects/yourInfo.page';
import { Overview } from '../page-objects/overview.page';




test.describe('Regression', () => {
    test.beforeEach(async ({ page }) => {
        const login = new LoginPage(page);
        await login.gotoLoginPage();
        await login.login('standard_user', 'secret_sauce');
    })
    test('User adds fleece jacket to the cart and checks out', async ({ page }) => {

        //user add fleece jacket to the cart
        const addJacket = new Inventory(page);
        await addJacket.addItem('Sauce Labs Fleece Jacket');
        await addJacket.clickShoppingCart();
        // user navigates to Cart
        const checkoutCart = new Cart(page);
        await checkoutCart.clickCheckout();
        //user enters customer information
        const info = new yourInfo(page);
        await info.enterCustomerInfo('Marco', 'Polo', '92036');
        // verify user is on Overview page
        await expect(page.locator('//*[@class="title"][@data-test="title"]')).toHaveText('Checkout: Overview');
        await expect(page.locator('//*[@class="inventory_item_name"][@data-test="inventory-item-name"]')).toHaveText('Sauce Labs Fleece Jacket');
        await expect(page.locator('//*[@data-test="total-info-label"]')).toHaveText('Price Total');
        await expect(page.locator('//*[@data-test="total-label"]')).toHaveText('Total: $53.99');
        //user click 'Finish'
        const clickFinish = new Overview(page);
        await clickFinish.finishOrder();
        //user is on Complete page
        await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Complete!');
        await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');

    })

    test('User is able to put 1 item to the cart and remove it', async ({ page }) => {
        // user adds labs bagpack to the cart
        const addBagpack = new Inventory(page);
        await addBagpack.addItem('Sauce Labs Backpack');
        //verify user added bagpack
        await expect(page.locator('//button[text()="Remove"]')).toBeVisible();
        await expect(addBagpack.cartBadge).toContainText("1");
        addBagpack.removeItem('Sauce Labs Backpack');
        //verify pagpack was removed from a cart
        await expect(addBagpack.cartBadge).toBeHidden();
    });


    test('User is able to add all items to the cart',async({page}) =>{
        const allItems = new Inventory(page);
        await allItems.addAllItemsToCart;
        await expect(allItems.cartBadge).toContainText('6');

    })

    // test('testy test',async({page}) =>{
    //     const productPage = new Inventory(page);

    //     const addToCartButtons = await productPage.getAllAddToCartButtons();
    
    //     for (const button of addToCartButtons) {
    //         await productPage.clickAddToCartButton(button);
    //     }
    
    //    await expect(productPage.cartBadge).toContainText('6');


    // })


})
