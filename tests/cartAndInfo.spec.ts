import { test, expect } from 'page-objects/fixture.page';


test.describe('checking inventory & Info pages', () => {
    test.beforeEach(async ({ loginPage, inventoryPage }) => {
        test.info().annotations.push({ type: `GIVEN`, description: `user adds item to the cart` });
        await loginPage.gotoLoginPage();
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.addItem('Sauce Labs Bolt T-Shirt');
        await inventoryPage.clickShoppingCart();
    })

    test('User is able to remove item from cart @smoke', async ({ inventoryPage, cartPage }) => {
        await test.step(`WHEN user removes item from cart`, async () => {
            await inventoryPage.removeFromCartBtn.click();
        });
        await test.step(`THEN item is removed from cart`, async () => {
            await expect(cartPage.cartItem).toBeHidden();
        });
    })

    test('User is able to click at item/s name to see the details', async ({ cartPage }) => {
        await test.step(`WHEN user clicks at the item`, async () => {
        });
        await test.step(`THEN user sees price & description of the item`, async () => {
            const itemLDescription = await cartPage.cartItemDescription.textContent();
            const ItemPrice = await cartPage.cartItemPrice.textContent();
            const expectedText = 'Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.';
            const PriceExpected = '$15.99'
            await expect(itemLDescription).toEqual(expectedText);
            await expect(ItemPrice).toEqual(PriceExpected);
        });
    })

    test('User is able to click "Continue Shopping"', async ({ cartPage, page }) => {
        await test.step(`WHEN user clicks at "Continue Shopping" button`, async () => {
            cartPage.clickContShopping();
        });
        await test.step(`THEN user is on Inventory page`, async () => {
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        });

    })


})
