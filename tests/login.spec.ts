import { expect, test } from '../page-objects/fixture.page';


const commonPassword = 'secret_sauce';

const users = [
    'standard_user',
    'problem_user',
    'performance_glitch_user',
    'error_user',
    'visual_user'
];

test.describe.parallel('Checking ability of users to log in', () => {
    test.describe.parallel('Login Tests', () => {
        users.forEach((username) => {
            test(`Customer is able to log in as ${username}`, async ({ page, loginPage }) => {
                await test.step(`WHEN a user enters credentials`, async () => {
                    await loginPage.gotoLoginPage();
                    await loginPage.login(username, commonPassword);
                });
                await test.step(`THEN user is navigated to Inventory page`, async () => {
                    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
                    await expect(page.getByText('Swag Labs')).toBeVisible();
                });
            });
        });


        test('Customer is not able to log in as locked_out_user', async ({ page, loginPage }) => {
            await test.step(`WHEN a locked out user enters credentials`, async () => {
                await loginPage.gotoLoginPage();
                await loginPage.login('locked_out_user', commonPassword);
            });
            await test.step(`THEN user cannot log in`, async () => {
                await expect(page).toHaveURL('https://www.saucedemo.com/');
                await expect(page.getByText('Epic sadface: Sorry, this user has been locked out.')).toBeVisible();
            });
        });
    });

    test('Customer is not able to log in with incorrect username', async ({ page, loginPage }) => {
        await test.step(`WHEN user enters incorrect username with correct password`, async () => {
            await loginPage.gotoLoginPage();
            await loginPage.login('incorrect_username', commonPassword);
        });
        await test.step(`THEN user cannot log in`, async () => {
            await expect(page).toHaveURL('https://www.saucedemo.com/');
            await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
        });
    });

    test('Customer is not able to log in with incorrect password', async ({ page, loginPage }) => {
        await test.step(`WHEN user enters incorrect password with correct username`, async () => {
            await loginPage.gotoLoginPage();
            await loginPage.login('standard_user', 'wrong_password');
        });
        await test.step(`THEN user cannot log in`, async () => {
            await expect(page).toHaveURL('https://www.saucedemo.com/');
            await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
        });
    });


});
