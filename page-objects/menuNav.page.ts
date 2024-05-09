import { Locator, type Page } from "playwright/test";

export class MenuNav {

    readonly page: Page;
    menuNav: Locator;
    aboutBtn :Locator;
    allItemsBtn: Locator;
    logoutBtn: Locator;

    
    constructor(page: Page) {
        this.page = page;
        this.menuNav = page.locator('//div[@class="bm-burger-button"]');
        this.aboutBtn = page.locator('//a[text()="About"]');
        this.allItemsBtn = page.locator('//a[text()="All Items"]');
        this.logoutBtn = page.locator('//a[text()="Logout"]');

    }

    async openMenuNav(page: Page) {
        await this.menuNav.click();
    }









}