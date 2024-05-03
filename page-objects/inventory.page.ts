import { Locator, type Page } from "playwright/test";

export class Inventory {
    readonly page: Page;
    shoppingCart: Locator;
    inventoryPage: Locator;
    itemCards: Locator;
    cartBadge: Locator;
    addtoCartButtons: Locator;
    allItems: Locator;

    constructor(page: Page) {
        this.page = page;
        this.shoppingCart = page.locator('//*[@id="shopping_cart_container"]/a');
        this.inventoryPage = page.locator('//*[@class="title"]');
        this.itemCards = page.locator('//div[@class="inventory_item"]');
        this.cartBadge = page.locator('//*[@data-test="shopping-cart-badge"]');
        this.addtoCartButtons = page.locator('//button[text()="Add to cart"]');
        this.allItems = page.locator('[data-test="inventory-item"]');

    }

    async addItem(itemLabel: string) {
        const item = this.getItemByLabel(itemLabel);
        await item.locator('//button[text()="Add to cart"]').click();
    }
    getItemByLabel(itemLabel: string) {
        return this.itemCards.filter({ hasText: itemLabel })
    }

    async clickShoppingCart() {
        await this.shoppingCart.click();
    }

    async removeItem(itemLabel: string) {
        const item = this.getItemByLabel(itemLabel);
        await item.locator('//button[text()="Remove"]').click();
    }

    // async getAllAddToCartButtons(): Promise<any> {
    //     await this.page.waitForSelector('//button[text()="Add to cart"]', { state: 'visible' });
    //     return await this.addtoCartButtons.all();
    // }
    // async clickAddToCartButton(button: any) {
    //     await button.click();
    // }
    async addAllItemsToCart(page: Page) {
        for (const button of await this.allItems.all()) {
            await button.getByRole("button", { name: 'Add to cart' }).click();
        }
    }


}