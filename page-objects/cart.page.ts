import { Locator, type Page } from "playwright/test";

export class Cart {
    private page: Page;
    checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkoutButton = page.locator('//*[@name="checkout"]');

    }
    async clickCheckout() {
        await this.checkoutButton.click();
    }
}