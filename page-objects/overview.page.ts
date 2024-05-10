import { Locator, type Page } from "playwright/test";

export class Overview {

    private page: Page;
    finishButton: Locator;
    payInfoValue: Locator;
    shippingInfoValue: Locator;
    subtotalValue: Locator;
    taxValue: Locator;
    totalValue: Locator;
    cancelBtn: Locator;


    constructor(page: Page) {
        this.page = page;
        this.finishButton = page.locator('//*[@id="finish"]');
        this.payInfoValue = page.locator('//*[@data-test ="payment-info-value"]');
        this.shippingInfoValue = page.locator('//*[@data-test ="shipping-info-value"]');
        this.subtotalValue = page.locator('//*[@data-test="subtotal-label"]');
        this.taxValue = page.locator('//*[@data-test="tax-label"]');
        this.totalValue = page.locator('//*[@data-test="total-label"]');
        this.cancelBtn = page.getByRole('button', { name: 'Cancel' });
    }

    async finishOrder() {
        this.finishButton.click();
    }

    async cancelOrder() {
        this.cancelBtn.click();
    }


}