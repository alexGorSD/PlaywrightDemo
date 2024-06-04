import { Locator, type Page, test } from "playwright/test";
import { BasePage } from "./base.page";

export class Inventory extends BasePage {

    shoppingCart: Locator;
    cartBadge: Locator;
    allItems: Locator;
    addToCartBtn: Locator;
    removeFromCartBtn: Locator;
    backToProdBtn: Locator;
    price: Locator;


    constructor(page: Page) {
        super(page);
        this.shoppingCart = page.locator('//*[@id="shopping_cart_container"]/a');
        this.cartBadge = page.locator('//*[@data-test="shopping-cart-badge"]');
        this.allItems = page.locator('[data-test="inventory-item"]');
        this.addToCartBtn = page.getByRole("button", { name: 'Add to cart' });
        this.removeFromCartBtn = page.getByRole("button", { name: 'Remove' });
        this.backToProdBtn = page.getByText('Back to products');
        this.price = page.locator(`//*[@class="inventory_item_price"]`);
    }

    async addItem(itemLabel: string) {
        await test.step(`WHEN user adds ${itemLabel} to the shopping cart`, async () => {
            const item = this.getItemByLabel(itemLabel);
            await item.getByRole("button", { name: 'Add to cart' }).click();
        });
    }

    async clickItem(itemLabel: string) {
        await test.step(`WHEN user clicks at ${itemLabel} `, async () => {
            const item = this.getItemByLabel(itemLabel);
            await item.locator('//div[@class="inventory_item_name "]').click();
        });
    }

    getItemByLabel(itemLabel: string) {
        return this.allItems.filter({ hasText: itemLabel })
    }

    async clickShoppingCart() {
        await test.step('AND user clicks at shopping cart', async () => {
            await this.shoppingCart.click();
        });
    }

    async removeItem(itemLabel: string) {
        await test.step(`AND user removes ${itemLabel} from the cart`, async () => {
            const item = this.getItemByLabel(itemLabel);
            await item.getByRole('button', { name: 'Remove' }).click();
        });
    }

    async addAllItemsToCart(page: Page) {
        await test.step('WHEN user adds all items to the cart', async () => {
            for (const button of await this.allItems.all()) {
                await button.getByRole('button', { name: 'Add to cart' }).click();
            }
        });
    }
    async removeAllItemsFromCart(page: Page) {
        await test.step('AND user removes all items from the cart', async () => {
            for (const button of await this.allItems.all()) {
                await button.getByRole('button', { name: 'Remove' }).click();
            }
        });
    }

    async sortItemsList(page: Page, by: "name asc" | "name desc" | "price asc" | "price desc") {
        await test.step(`WHEN user sorts items by ${by}ending order`, async () => {
            let option = "";
            switch (by) {
                case "name asc":
                    option = "az";
                    break;
                case "name desc":
                    option = "za";
                    break;
                case "price asc":
                    option = "lohi";
                    break;
                case "price desc":
                    option = "hilo";
                    break;
            }
            await page.selectOption(`//*[@class="product_sort_container"]`, option);

        });
    };


}