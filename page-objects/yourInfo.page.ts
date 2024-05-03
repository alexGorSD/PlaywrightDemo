import { Locator, type Page } from "playwright/test";

export class yourInfo {
    readonly page: Page;
    customerFirstName: Locator;
    customerLastName: Locator;
    customerZipCode: Locator;
    continueButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.customerFirstName = page.locator('//*[@id="first-name"]');
        this.customerLastName = page.locator('//*[@id="last-name"]');
        this.customerZipCode = page.locator('//*[@id="postal-code"]');
        this.continueButton = page.locator('//*[@id="continue"]');

    }

    async enterCustomerInfo(firstName: string, lastName: string, zipCode: string) {
        await this.customerFirstName.fill(firstName);
        await this.customerLastName.fill(lastName);
        await this.customerZipCode.fill(zipCode);
        this.continueButton.click();
    }


}