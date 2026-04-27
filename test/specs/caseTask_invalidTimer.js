import { browser, expect } from '@wdio/globals';
import LoginCredentials from '../pageobjects/loginCredencials.js';
import Tasks from '../pageobjects/caseTaskResources.js';

describe('Case Task Tests', () => {
     it('should input invalid entries into timer add time function', async () => {
        await LoginCredentials.url();
        await LoginCredentials.login(
            process.env.LOGIN_USERNAME,
            process.env.LOGIN_PASSWORD
        );
        await expect(LoginCredentials.loggedIn).toBeDisplayed();
        await Tasks.navigateToCasePage();

        await Tasks.clickCaseAddTimeButton();
        await Tasks.enterHours(999999999);
        await expect(Tasks.submitTimeButton).not.toBeClickable();
        await browser.keys('Escape');
        await browser.pause(1000);

        await Tasks.clickCaseAddTimeButton();
        await Tasks.enterHours('!@#$%^&*');
        await expect(Tasks.submitTimeButton).not.toBeClickable();
        await browser.keys('Escape');
        await browser.pause(1000);

        await Tasks.clickCaseAddTimeButton();
        await Tasks.enterHours('abcdefgh');
        await expect(Tasks.submitTimeButton).not.toBeClickable();
        await browser.keys('Escape');
        await browser.pause(1000);
    });
});
