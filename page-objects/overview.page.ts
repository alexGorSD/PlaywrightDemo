import { Locator, type Page } from "playwright/test";

export class Overview {
    private page: Page;
    finishButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.finishButton = page.locator('//*[@id="finish"]');
    }

    async finishOrder() {
        this.finishButton.click();
    }
}