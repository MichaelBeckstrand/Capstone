import { browser, expect } from '@wdio/globals';
import LoginCredentials from '../pageobjects/loginCredencials.js';

describe('Security', () => {
    it('should login successfully using environment credentials', async () => {
        // Log in and verify the user is authenticated
        await LoginCredentials.url();
        await LoginCredentials.login(
            process.env.LOGIN_USERNAME,
            process.env.LOGIN_PASSWORD
        );
        await expect(LoginCredentials.loggedIn).toBeDisplayed();

        // Log out and confirm the login button is shown on a protected page
        await LoginCredentials.logout.click();
        await browser.url('https://app.thecasework.com/case/ba3e61e7-8a1e-405b-968f-d201059f4b97');
        await expect(LoginCredentials.loginButton).toBeDisplayed();
    });
});
