import { expect, test } from '@playwright/test';
import { LoginPage } from '../page-objects/login.page';
import { Inventory } from '../page-objects/inventory.page';
import { MenuNav } from '../page-objects/menuNav.page';


test.describe('Adding & Removing Items From Cart', () => {
    test.beforeEach(async ({ page }) => {
        const login = new LoginPage(page);
        const userName = 'standard_user';
        const password = 'secret_sauce';
        test.info().annotations.push({ type: 'GIVEN', description: `I'm logged in as ${userName}` });
        await login.gotoLoginPage();
        await login.login(userName, password);
    })

    test('User is able to see item details', async ({ page }) => {
        const inventory = new Inventory(page);
        await test.step(`WHEN user looks at an item`, async () => {
            await inventory.getItemByLabel('Sauce Labs Bolt T-Shirt');
        });
        await test.step(`THEN user can see the price and description`, async () => {
            await expect(page.getByText('$15.99').first()).toBeVisible();
            await expect(page.getByText('Get your testing superhero on')).toBeVisible();
        });
    })

    test('User is able to put 1 item to the cart and remove it', async ({ page }) => {
        const inventory = new Inventory(page);
        await inventory.addItem('Sauce Labs Backpack');
        await test.step(`AND user verifies item added to the cart`, async () => {
            await expect(inventory.removeFromCartBtn).toBeVisible();
            await expect(inventory.cartBadge).toContainText("1");
        });
        inventory.removeItem('Sauce Labs Backpack');
        await test.step(`THEN user verifies there's no item in the cart`, async () => {
            await expect(inventory.cartBadge).toBeHidden();
        });

    });

    test('User is able to add all items to the cart', async ({ page }) => {
        test.slow();
        const inventory = new Inventory(page);
        await inventory.addAllItemsToCart(page);
        await test.step(`THEN user verifies all items are added to the cart`, async () => {
            await expect(inventory.cartBadge).toContainText('6');
        });
    })

    test('User is able to add all items to the cart and remove it', async ({ page }) => {
        const inventory = new Inventory(page);
        //user adds all items to the cart
        await inventory.addAllItemsToCart(page);
        test.step(`AND user verifies all items are added`, async () => {
            await expect(inventory.cartBadge).toContainText('6');
        });
        //user removes all items from the cart
        await inventory.removeAllItemsFromCart(page);
        test.step(`THEN user verifies all items are removed from the cart`, async () => {
            await expect(inventory.cartBadge).toBeHidden();
        });
    })

    test('User is able to click "About" and navigate to SauceLabs landing page', async ({ page }) => {
        const menuNav = new MenuNav(page);
        await menuNav.openMenuNav(page);
        await test.step(`AND user clicks 'About' button`, async () => {
            await menuNav.aboutBtn.click();
        });
        await test.step(`THEN user is on saucelabs.com`, async () => {
            await expect(page).toHaveURL('https://saucelabs.com/');
        });
    })

    test('User is able to click "Logout" and navigate to login page', async ({ page }) => {
        const menuNav = new MenuNav(page);
        await menuNav.openMenuNav(page);
        await test.step(`AND user clicks 'Logout' button`, async () => {
            await menuNav.logoutBtn.click();
        });
        await test.step(`THEN user is on login page`, async () => {
            await expect(page).toHaveURL('https://www.saucedemo.com/');
        });
    })

    test('User is able to click "All Items" and navigate to inventory page', async ({ page }) => {
        //user adds fleece jacket to the cart
        const inventory = new Inventory(page);
        await inventory.addItem('Sauce Labs Fleece Jacket');
        await inventory.clickShoppingCart();
        const menuNav = new MenuNav(page);
        await test.step(`AND user opens Menu Navigation`, async () => {
            await menuNav.openMenuNav(page);
        });
        await test.step(`AND user clicks "All Items" button`, async () => {
            await menuNav.allItemsBtn.click();
        });
        await test.step(`THEN user is on Inventory page & item still in the cart`, async () => {
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
            await expect(inventory.cartBadge).toContainText('1');
        });
    })

    test(`User is able to click at item's name to see the details`, async ({ page }) => {
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
        await test.step(`AND user adds item to the cart`, async () => {
            await inventory.addToCartBtn.click();
        });
        await test.step(`THEN user is able to see item in the cart`, async () => {
            await expect(inventory.addToCartBtn).toBeHidden();
            await expect(inventory.cartBadge).toContainText('1');
        });
    })

    test('User is able to remove item from the cart', async ({ page }) => {
        const inventory = new Inventory(page);
        await inventory.clickItem('Sauce Labs Bolt T-Shirt');
        // user adds item detail to the cart
        await test.step('AND user adds item to the cart', async () => {
            await inventory.addToCartBtn.click();
        });
        await test.step('AND user removes item from the cart', async () => {
            await inventory.removeFromCartBtn.click();
        });
        await test.step('THEN user verifies no item in the cart', async () => {
            await expect(inventory.addToCartBtn).toBeVisible();
            await expect(inventory.cartBadge).toBeHidden();
        });
    })

    test('User is able to go back to products', async ({ page }) => {
        const inventory = new Inventory(page);
        await inventory.clickItem('Sauce Labs Onesie');
        await test.step(`AND user clicks 'Back to products'`, async () => {
            await inventory.backToProdBtn.click();
        });
        await test.step(`THEN user is navigated to inventory page`, async () => {
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        });
    })

    test('User is able to sort items', async ({ page }) => {
        const inventory = new Inventory(page);
        await inventory.sortItemsList(page, "price desc");
        await test.step(`THEN user verifies items sorted correctly`, async () => {
            const itemPrices = await inventory.price.allInnerTexts();
            const expectedItemPrices = ["$49.99", "$29.99", "$15.99", "$15.99", "$9.99", "$7.99"];
            expect(itemPrices).toEqual(expectedItemPrices);
        });
    })




})



