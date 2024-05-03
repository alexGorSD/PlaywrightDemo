import { Locator, type Page } from "playwright/test";

export class Inventory {
    readonly page: Page;
    shoppingCart: Locator;
    cartBadge: Locator;
    allItems: Locator;


    constructor(page: Page) {
        this.page = page;
        this.shoppingCart = page.locator('//*[@id="shopping_cart_container"]/a');
        this.cartBadge = page.locator('//*[@data-test="shopping-cart-badge"]');
        this.allItems = page.locator('[data-test="inventory-item"]');
    }

    async addItem(itemLabel: string) {
        const item = this.getItemByLabel(itemLabel);
        await item.getByRole("button", { name: 'Add to cart' }).click();
    }
    getItemByLabel(itemLabel: string) {
        return this.allItems.filter({ hasText: itemLabel })
    }

    async clickShoppingCart() {
        await this.shoppingCart.click();
    }

    async removeItem(itemLabel: string) {
        const item = this.getItemByLabel(itemLabel);
        await item.getByRole("button", { name: 'Remove' }).click();
    }

    async addAllItemsToCart(page: Page) {
        for (const button of await this.allItems.all()) {
            await button.getByRole("button", { name: 'Add to cart' }).click();
        }
    }
    async removeAllItemsFromCart(page: Page) {
        for (const button of await this.allItems.all()) {
            await button.getByRole("button", { name: 'Remove' }).click();
        }
    }

}