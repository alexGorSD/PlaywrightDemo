import { Locator, type Page } from "playwright/test";

export class Complete {

    readonly page: Page;

    
    backHomebutton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.backHomebutton = page.getByRole('button', { name: 'Back Home' });
    }

    async goBackHome() {
        await this.backHomebutton.click();
    }
}