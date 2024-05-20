import { test as base } from '@playwright/test';
import { LoginPage } from './login.page';
import { Cart } from './cart.page';
import { Complete } from './complete.page';
import { CustomerInfo } from './customerInfo.page';
import { Inventory } from './inventory.page';
import { MenuNav } from './menuNav.page';
import { Overview } from './overview.page';

type MyFixtures = {
    loginPage: LoginPage;
    cartPage: Cart;
    completePage: Complete;
    customerInfoPage: CustomerInfo;
    inventoryPage: Inventory;
    menuNavPage: MenuNav;
    overviewPage: Overview;
};

export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    cartPage: async ({ page }, use) => {
        const cartPage = new Cart(page);
        await use(cartPage);
    },
    completePage: async ({ page }, use) => {
        const completePage = new Complete(page);
        await use(completePage);
    },
    customerInfoPage: async ({ page }, use) => {
        const customerInfoPage = new CustomerInfo(page);
        await use(customerInfoPage);
    },
    inventoryPage: async ({ page }, use) => {
        const inventoryPage = new Inventory(page);
        await use(inventoryPage);
    },
    menuNavPage: async ({ page }, use) => {
        const menuNavPage = new MenuNav(page);
        await use(menuNavPage);
    },
    overviewPage: async ({ page }, use) => {
        const overviewPage = new Overview(page);
        await use(overviewPage);
    }

});
export { expect } from '@playwright/test';


