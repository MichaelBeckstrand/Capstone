import { browser, expect } from '@wdio/globals';
import LoginCredentials from '../pageobjects/loginCredencials.js';
import Tasks from '../pageobjects/caseTaskResources.js';

describe('Case Task Tests', () => {
    it('should edit a task, not save changes, then save changes', async () => {
        await LoginCredentials.url();
        await LoginCredentials.login(
            process.env.LOGIN_USERNAME,
            process.env.LOGIN_PASSWORD
        );
        await expect(LoginCredentials.loggedIn).toBeDisplayed();
        await Tasks.navigateToCasePage();

        await Tasks.editAllFieldsUnsavedCase();
        await Tasks.editAllFieldsCase();
        await browser.pause(2000);
    });
});
