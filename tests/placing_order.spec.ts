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
    test('User is able to see item details', async ({ page }) => {
        const inventoryTShirt = new Inventory(page);
        await inventoryTShirt.getItemByLabel('Sauce Labs Bolt T-Shirt')
        await expect.soft(page.getByText('$15.99').first()).toBeVisible();
        await expect.soft(page.getByText('Get your testing superhero on')).toBeVisible();
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
        const info = new yourInfo(page);
        await info.enterCustomerInfo('Marco', 'Polo', '92036');
        // verify user is on Overview page
        await expect(page.getByText('Checkout: Overview')).toBeVisible();
        await expect(page.getByText('Sauce Labs Fleece Jacket')).toBeVisible();
        await expect(page.getByText('Price Total')).toBeVisible();
        await expect(page.getByText('Total: $53.99')).toBeVisible();
        //user click 'Finish'
        const clickFinish = new Overview(page);
        await clickFinish.finishOrder();
        //user is on Complete page
        await expect(page.getByText('Checkout: Complete!')).toBeVisible();
        await expect(page.getByText('Thank you for your order!')).toBeVisible();

    })

    test('User is able to put 1 item to the cart and remove it', async ({ page }) => {
        // user adds labs bagpack to the cart
        const addBagpack = new Inventory(page);
        await addBagpack.addItem('Sauce Labs Backpack');
        //verify user added bagpack
        await expect(page.locator('//button[text()="Remove"]')).toBeVisible();
        await expect(addBagpack.cartBadge).toContainText("1");
        addBagpack.removeItem('Sauce Labs Backpack');
        //verify bagpack was removed from a cart
        await expect(addBagpack.cartBadge).toBeHidden();
    });


    test('User is able to add all items to the cart', async ({ page }) => {
        const inventoryAddItems = new Inventory(page);
        await inventoryAddItems.addAllItemsToCart(page);
        await expect(inventoryAddItems.cartBadge).toContainText('6');
    })

    test('User is able to add all items to the cart and remove it', async ({ page }) => {
        const inventoryRemoveItems = new Inventory(page);
        //user adds all items to the cart
        await inventoryRemoveItems.addAllItemsToCart(page);
        await expect(inventoryRemoveItems.cartBadge).toContainText('6');
        //user removes all items from the cart
        await inventoryRemoveItems.removeAllItemsFromCart(page);
        await expect(inventoryRemoveItems.cartBadge).toBeHidden();
    })


})
