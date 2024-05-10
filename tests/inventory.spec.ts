import { expect, test } from '@playwright/test';
import { LoginPage } from '../page-objects/login.page';
import { Inventory } from '../page-objects/inventory.page';
import { MenuNav } from '../page-objects/menuNav.page';


test.describe('Adding & Removing Items From Cart', () => {
    test.beforeEach(async ({ page }) => {
        const login = new LoginPage(page);
        await login.gotoLoginPage();
        await login.login('standard_user', 'secret_sauce');
    })

    test('User is able to see item details', async ({ page }) => {
        const inventory = new Inventory(page);
        await inventory.getItemByLabel('Sauce Labs Bolt T-Shirt');
        await expect(page.getByText('$15.99').first()).toBeVisible();
        await expect(page.getByText('Get your testing superhero on')).toBeVisible();
    })

    test('User is able to put 1 item to the cart and remove it', async ({ page }) => {
        // user adds labs bagpack to the cart
        const inventory = new Inventory(page);
        await inventory.addItem('Sauce Labs Backpack');
        //verify user added bagpack
        await expect(page.locator('//button[text()="Remove"]')).toBeVisible();
        await expect(inventory.cartBadge).toContainText("1");
        inventory.removeItem('Sauce Labs Backpack');
        //verify bagpack was removed from a cart
        await expect(inventory.cartBadge).toBeHidden();
    });

    test('User is able to add all items to the cart', async ({ page }) => {
        test.slow();
        const inventory = new Inventory(page);
        await inventory.addAllItemsToCart(page);
        await expect(inventory.cartBadge).toContainText('6');
    })

    test('User is able to add all items to the cart and remove it', async ({ page }) => {
        const inventory = new Inventory(page);
        //user adds all items to the cart
        await inventory.addAllItemsToCart(page);
        await expect(inventory.cartBadge).toContainText('6');
        //user removes all items from the cart
        await inventory.removeAllItemsFromCart(page);
        await expect(inventory.cartBadge).toBeHidden();
    })

    test('User is able to click "About" and navigate to SauceLabs landing page', async ({ page }) => {
        const menuNav = new MenuNav(page);
        await menuNav.openMenuNav(page);
        await menuNav.aboutBtn.click();
        //verify user is on saucelabs.com
        await expect(page).toHaveURL('https://saucelabs.com/');
    })

    test('User is able to click "Logout" and navigate to login page', async ({ page }) => {
        const menuNav = new MenuNav(page);
        await menuNav.openMenuNav(page);
        await menuNav.logoutBtn.click();
        //verify user is on Login page
        await expect(page).toHaveURL('https://www.saucedemo.com/');
    })

    test('User is able to click "All Items" and navigate to inventory page', async ({ page }) => {
        //user adds fleece jacket to the cart
        const inventory = new Inventory(page);
        await inventory.addItem('Sauce Labs Fleece Jacket');
        await inventory.clickShoppingCart();
        const menuNav = new MenuNav(page);
        await menuNav.openMenuNav(page);
        await menuNav.allItemsBtn.click();
        //verify user is on Inventory page & item still in the cart
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(inventory.cartBadge).toContainText('1');
    })

    test('User is able to click at item/s name to see the details', async ({ page }) => {
        const inventory = new Inventory(page);
        await inventory.clickItem('Sauce Labs Onesie');
        // verify user sees item details
        await expect.soft(page.getByAltText('Sauce Labs Onesie')).toBeVisible();
        await expect.soft(page.getByText('Sauce Labs Onesie')).toBeVisible();
        await expect.soft(page.getByText('$7.99')).toBeVisible();
    })

    test('User is able to add item to the cart', async ({ page }) => {
        const inventory = new Inventory(page);
        await inventory.clickItem('Sauce Labs Bike Light');
        // user adds item detail to the cart
        await inventory.addToCartBtn.click();
        //verify user added item
        await expect(inventory.addToCartBtn).toBeHidden();
        await expect(inventory.cartBadge).toContainText('1');
    })
    test('User is able to remove item from the cart', async ({ page }) => {
        const inventory = new Inventory(page);
        await inventory.clickItem('Sauce Labs Bolt T-Shirt');
        // user adds item detail to the cart
        await inventory.addToCartBtn.click();
        await inventory.removeFromCartBtn.click();
        //verify user removed item
        await expect(inventory.addToCartBtn).toBeVisible();
        await expect(inventory.cartBadge).toBeHidden();
    })

    test('User is able to go back to products', async ({ page }) => {
        const inventory = new Inventory(page);
        await inventory.clickItem('Sauce Labs Onesie');
        await inventory.backToProdBtn.click();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    })
    
    test('User is able to sort items', async ({ page }) => {
        const inventory = new Inventory(page);      
        await inventory.sortItemsList(page, "price desc");
        const itemPrices = await inventory.price.allInnerTexts();
        const expectedItemPrices = ["$49.99", "$29.99", "$15.99", "$15.99", "$9.99", "$7.99"];
        expect(itemPrices).toEqual(expectedItemPrices);
    })




})



