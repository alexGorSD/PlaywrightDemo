import { Locator, type Page, test } from "playwright/test";
import { BasePage } from "./base.page";

export class Overview  extends BasePage{

    finishButton: Locator;
    payInfoValue: Locator;
    shippingInfoValue: Locator;
    subtotalValue: Locator;
    taxValue: Locator;
    totalValue: Locator;
    cancelBtn: Locator;


    constructor(page: Page) {
        super(page);
        this.finishButton = page.getByRole('button', { name: 'Finish' });
        this.payInfoValue = page.locator('//*[@data-test ="payment-info-value"]');
        this.shippingInfoValue = page.locator('//*[@data-test ="shipping-info-value"]');
        this.subtotalValue = page.locator('//*[@data-test="subtotal-label"]');
        this.taxValue = page.locator('//*[@data-test="tax-label"]');
        this.totalValue = page.locator('//*[@data-test="total-label"]');
        this.cancelBtn = page.getByRole('button', { name: 'Cancel' });
    }

    async finishOrder() {
        await test.step(`AND user clicks "Finish"`, async () => {
            this.finishButton.click();
        });
    }

    async cancelOrder() {
        this.cancelBtn.click();
    }


}