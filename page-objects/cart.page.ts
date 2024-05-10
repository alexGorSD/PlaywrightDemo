import { Locator, type Page } from "playwright/test";

export class Cart {

    readonly page: Page;
    checkoutButton: Locator;
    cartItem: Locator;
    cartItemDescription: Locator;
    cartItemPrice: Locator;
    contShopBtn: Locator;


    constructor(page: Page) {
        this.page = page;
        this.checkoutButton = page.getByRole("button", { name: 'Checkout' });
        this.cartItem = page.locator('//*[@class="cart_item"]');
        this.cartItemDescription = page.locator('//*[@class="inventory_item_desc"]');
        this.cartItemPrice = page.locator('//*[@class="inventory_item_price"]');
        this.contShopBtn = page.getByRole("button", { name: 'Continue Shopping' });
    }

    async clickCheckout() {
        await this.checkoutButton.click();
    }

    async clickContShopping() {
        await this.contShopBtn.click();
    }

    
}