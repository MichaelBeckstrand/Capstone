import { expect } from '@wdio/globals';
import LoginCredentials from '../pageobjects/loginCredencials.js';
import Engagements from '../pageobjects/engagementResources.js';
import Tasks from '../pageobjects/caseTaskResources.js';

describe('Engagement Title', () => {
    it('should update the engagement title', async () => {
        // Log in and navigate to the target case's Engagement tab
        await LoginCredentials.url();
        await LoginCredentials.login(
            process.env.LOGIN_USERNAME,
            process.env.LOGIN_PASSWORD
        );
        await expect(LoginCredentials.loggedIn).toBeDisplayed();
        await Tasks.goToCase('5309d590-1c80-4d68-a0c3-6c323f09d922');
        await Engagements.clickEngagementTab();

        // Enter a new title and save, then confirm the save button is gone
        const title = `Updated Title ${Date.now()}`;
        await Engagements.enterNewTitle(title);
        await Engagements.saveEngagement();
        await expect(Engagements.engagementSaveButton).not.toBeDisplayed()
    });
});
