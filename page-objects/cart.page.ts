import { Locator, type Page, test } from "playwright/test";
import { BasePage } from "./base.page";

export class Cart extends BasePage {

    checkoutButton: Locator;
    cartItem: Locator;
    cartItemDescription: Locator;
    cartItemPrice: Locator;
    contShopBtn: Locator;


    constructor(page: Page) {
        super(page);
        this.checkoutButton = page.getByRole("button", { name: 'Checkout' });
        this.cartItem = page.locator('//*[@class="cart_item"]');
        this.cartItemDescription = page.locator('//*[@class="inventory_item_desc"]');
        this.cartItemPrice = page.locator('//*[@class="inventory_item_price"]');
        this.contShopBtn = page.getByRole("button", { name: 'Continue Shopping' });
    }

    async clickCheckout() {
        test.step(`AND user clicks 'Checkout'`, async () => {
            await this.checkoutButton.click();
        });
    }

    async clickContShopping() {
        await this.contShopBtn.click();
    }


}