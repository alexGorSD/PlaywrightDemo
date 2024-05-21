import { expect, test } from '../page-objects/fixture.page';


test.describe('Adding & Removing Items From Cart', () => {
    test.beforeEach(async ({ loginPage }) => {
        const userName = 'standard_user';
        const password = 'secret_sauce';
        test.info().annotations.push({ type: 'GIVEN', description: `I'm logged in as ${userName}` });
        await loginPage.gotoLoginPage();
        await loginPage.login(userName, password);
    })

    test('User is able to see item details', async ({ page, inventoryPage }) => {
        await expect(async () => {
            await test.step(`WHEN user looks at an item`, async () => {
                await inventoryPage.getItemByLabel('Sauce Labs Bolt T-Shirt');
            });
            await test.step(`THEN user can see the price and description`, async () => {
                await expect(page.getByText('$15.99').first()).toBeVisible();
                await expect(page.getByText('Get your testing superhero on')).toBeVisible();
            });
        }).toPass();
    })

    test('User is able to put 1 item to the cart and remove it', async ({ inventoryPage }) => {
        await inventoryPage.addItem('Sauce Labs Backpack');
        await test.step(`AND user verifies item added to the cart`, async () => {
            await expect(inventoryPage.removeFromCartBtn).toBeVisible();
            await expect(inventoryPage.cartBadge).toContainText("1");
        });
        inventoryPage.removeItem('Sauce Labs Backpack');
        await test.step(`THEN user verifies there's no item in the cart`, async () => {
            await expect(inventoryPage.cartBadge).toBeHidden();
        });

    });

    test('User is able to add all items to the cart', async ({ page, inventoryPage }) => {
        await inventoryPage.addAllItemsToCart(page);
        await test.step(`THEN user verifies all items are added to the cart`, async () => {
            await expect(inventoryPage.cartBadge).toContainText('6');
        });
    })

    test('User is able to add all items to the cart and remove it', async ({ page, inventoryPage }) => {
        //user adds all items to the cart
        await inventoryPage.addAllItemsToCart(page);
        test.step(`AND user verifies all items are added`, async () => {
            await expect(inventoryPage.cartBadge).toContainText('6');
        });
        //user removes all items from the cart
        await expect(async () => {
            await inventoryPage.removeAllItemsFromCart(page);
            test.step(`THEN user verifies all items are removed from the cart`, async () => {
                await expect(inventoryPage.cartBadge).toBeHidden();
            });
        }).toPass();
    })

    test('User is able to click "About" and navigate to SauceLabs landing page', async ({ page, menuNavPage }) => {
        await menuNavPage.openMenuNav(page);
        await test.step(`AND user clicks 'About' button`, async () => {
            await menuNavPage.aboutBtn.click();
        });
        await test.step(`THEN user is on saucelabs.com`, async () => {
            await expect(page).toHaveURL('https://saucelabs.com/');
        });
    })

    test('User is able to click "Logout" and navigate to login page', async ({ page, menuNavPage }) => {
        await menuNavPage.openMenuNav(page);
        await test.step(`AND user clicks 'Logout' button`, async () => {
            await menuNavPage.logoutBtn.click();
        });
        await test.step(`THEN user is on login page`, async () => {
            await expect(page).toHaveURL('https://www.saucedemo.com/');
        });
    })

    test('User is able to click "All Items" and navigate to inventory page', async ({ page, inventoryPage, menuNavPage }) => {
        //user adds fleece jacket to the cart
        await inventoryPage.addItem('Sauce Labs Fleece Jacket');
        await inventoryPage.clickShoppingCart();
        await test.step(`AND user opens Menu Navigation`, async () => {
            await menuNavPage.openMenuNav(page);
        });
        await test.step(`AND user clicks "All Items" button`, async () => {
            await menuNavPage.allItemsBtn.click();
        });
        await test.step(`THEN user is on Inventory page & item still in the cart`, async () => {
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
            await expect(inventoryPage.cartBadge).toContainText('1');
        });
    })

    test(`User is able to click at item's name to see the details`, async ({ page, inventoryPage }) => {
        await inventoryPage.clickItem('Sauce Labs Onesie');
        await test.step(`THEN user is able to see image,title, and price `, async () => {
            await expect.soft(page.getByAltText('Sauce Labs Onesie')).toBeVisible();
            await expect.soft(page.getByText('Sauce Labs Onesie')).toBeVisible();
            await expect.soft(page.getByText('$7.99')).toBeVisible();
        })
    })

    test('User is able to add item to the cart', async ({ inventoryPage }) => {
        await inventoryPage.clickItem('Sauce Labs Bike Light');
        await test.step(`AND user adds item to the cart`, async () => {
            await inventoryPage.addToCartBtn.click();
        });
        await test.step(`THEN user is able to see item in the cart`, async () => {
            await expect(inventoryPage.addToCartBtn).toBeHidden();
            await expect(inventoryPage.cartBadge).toContainText('1');
        });
    })

    test('User is able to remove item from the cart', async ({ inventoryPage }) => {
        await inventoryPage.clickItem('Sauce Labs Bolt T-Shirt');
        await test.step('AND user adds item to the cart', async () => {
            await inventoryPage.addToCartBtn.click();
        });
        await test.step('AND user removes item from the cart', async () => {
            await inventoryPage.removeFromCartBtn.click();
        });
        await test.step('THEN user verifies no item in the cart', async () => {
            await expect(inventoryPage.addToCartBtn).toBeVisible();
            await expect(inventoryPage.cartBadge).toBeHidden();
        });
    })

    test('User is able to go back to products', async ({ page, inventoryPage }) => {
        await inventoryPage.clickItem('Sauce Labs Onesie');
        await test.step(`AND user clicks 'Back to products'`, async () => {
            await inventoryPage.backToProdBtn.click();
        });
        await test.step(`THEN user is navigated to inventory page`, async () => {
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        });
    })

    test('User is able to sort items', async ({ page, inventoryPage }) => {
        await inventoryPage.sortItemsList(page, "price desc");
        await test.step(`THEN user verifies items sorted correctly`, async () => {
            const itemPrices = await inventoryPage.price.allInnerTexts();
            const expectedItemPrices = ["$49.99", "$29.99", "$15.99", "$15.99", "$9.99", "$7.99"];
            expect(itemPrices).toEqual(expectedItemPrices);
        });
    })




})



