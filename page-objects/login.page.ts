import { Locator, type Page } from "playwright/test";

export class LoginPage {
    private page: Page;
    usernameInput: Locator;
    passwordInput: Locator;
    loginButton: Locator;
    inventoryLandingPage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('//*[@id="user-name"]');
        this.passwordInput = page.locator('//*[@id="password"]');
        this.loginButton = page.locator('//*[@id="login-button"]');
        this.inventoryLandingPage = page.locator('//*[@class="app_logo"]');
    }

    async gotoLoginPage() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}