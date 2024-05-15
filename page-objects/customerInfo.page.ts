import { Locator, type Page, test } from "playwright/test";

export class CustomerInfo {

    readonly page: Page;
    customerFirstName: Locator;
    customerLastName: Locator;
    customerZipCode: Locator;
    continueButton: Locator;
    errorBox: Locator;
    cancelBtn: Locator;


    constructor(page: Page) {
        this.page = page;
        this.customerFirstName = page.getByPlaceholder('First Name');
        this.customerLastName = page.getByPlaceholder('Last Name');
        this.customerZipCode = page.getByPlaceholder('Zip/Postal Code');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.errorBox = page.locator('//*[@class="error-message-container error"]');
        this.cancelBtn = page.getByRole('button', { name: 'Cancel' });
    }

    async enterCustomerInfo(firstName: string, lastName: string, zipCode: string) {
        await test.step(`AND user enters personal information`, async () => {
            await this.customerFirstName.fill(firstName);
            await this.customerLastName.fill(lastName);
            await this.customerZipCode.fill(zipCode);
            this.continueButton.click();
        });
    }

    async customerInfoGoBack() {
        await this.cancelBtn.click();
    }

    async customerInfoContinue() {
        await this.continueButton.click();
    }


}