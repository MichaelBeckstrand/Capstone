import { browser, expect } from '@wdio/globals';
import LoginCredentials from '../pageobjects/loginCredencials.js';
import Engagements from '../pageobjects/engagementResources.js';
import Tasks from '../pageobjects/caseTaskResources.js';

describe('Engagement Title', () => {
    it('should not update the engagement title without saving', async () => {
        // Log in and navigate to the target case's Engagement tab
        await LoginCredentials.url();
        await LoginCredentials.login(
            process.env.LOGIN_USERNAME,
            process.env.LOGIN_PASSWORD
        );
        await expect(LoginCredentials.loggedIn).toBeDisplayed();
        await Tasks.goToCase('a67bca0e-88fa-4df3-878f-ca5f99a38f46');
        await Engagements.clickEngagementTab();

        // Enter a new title but refresh the page without saving
        await Engagements.enterNewTitle('Unsaved Title');
        await browser.refresh();

        // Confirm the save button is not present after reload, indicating no unsaved state persisted
        await Engagements.clickEngagementTab();
        await expect(Engagements.engagementSaveButton).not.toBeDisplayed()
    });
});
