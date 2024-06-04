import { Locator, type Page } from "playwright/test";
import { BasePage } from "./base.page";

export class Complete extends BasePage {

    backHomebutton: Locator;


    constructor(page: Page) {
        super(page);
        this.backHomebutton = page.getByRole('button', { name: 'Back Home' });
    }

    async goBackHome() {
        await this.backHomebutton.click();
    }


}