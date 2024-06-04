import { Locator, type Page, test } from "playwright/test";
import { BasePage } from "./base.page";

export class MenuNav extends BasePage {

    menuNav: Locator;
    aboutBtn: Locator;
    allItemsBtn: Locator;
    logoutBtn: Locator;


    constructor(page: Page) {
        super(page);
        this.menuNav = page.locator('//div[@class="bm-burger-button"]');
        this.aboutBtn = page.locator('//a[text()="About"]');
        this.allItemsBtn = page.locator('//a[text()="All Items"]');
        this.logoutBtn = page.locator('//a[text()="Logout"]');
    }

    async openMenuNav(page: Page) {
        await test.step(`WHEN user opens Menu Navigation`, async () => {
            await this.menuNav.click();
        });

    }


}