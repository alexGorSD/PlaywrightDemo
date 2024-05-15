import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/login.page';
import { Inventory } from '../page-objects/inventory.page';
import { Cart } from '../page-objects/cart.page';


test.describe('checking inventory & Info pages', () => {
    test.beforeEach(async ({ page }) => {
        test.info().annotations.push({ type: `GIVEN`, description: `user adds item to the cart` });
        const login = new LoginPage(page);
        await login.gotoLoginPage();
        await login.login('standard_user', 'secret_sauce');
        const inventory = new Inventory(page);
        await inventory.addItem('Sauce Labs Bolt T-Shirt');
        await inventory.clickShoppingCart();
    })

    test('User is able to remove item from cart', async ({ page }) => {
        await test.step(`WHEN user removes item from cart`, async () => {
            const inventory = new Inventory(page);
            await inventory.removeFromCartBtn.click();
        });
        await test.step(`THEN item is removed from cart`, async () => {
            const cartItem = new Cart(page);
            await expect(cartItem.cartItem).toBeHidden();
        });
    })

    test('User is able to click at item/s name to see the details', async ({ page }) => {
        const cart = new Cart(page);
        await test.step(`WHEN user clicks at the item`, async () => {
        });
        await test.step(`THEN user sees price & description of the item`, async () => {
            const itemLDescription = await cart.cartItemDescription.textContent();
            const ItemPrice = await cart.cartItemPrice.textContent();
            const expectedText = 'Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.';
            const PriceExpected = '$15.99'
            await expect(itemLDescription).toEqual(expectedText);
            await expect(ItemPrice).toEqual(PriceExpected);
        });
    })

    test('User is able to click "Continue Shopping"', async ({ page }) => {
        await test.step(`WHEN user clicks at "Continue Shopping" button`, async () => {
            const cart = new Cart(page);
            cart.clickContShopping();
        });
        await test.step(`THEN user is on Inventory page`, async () => {
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        });
        
    })


})
