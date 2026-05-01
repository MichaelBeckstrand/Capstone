import { browser, expect } from '@wdio/globals';
import LoginCredentials from '../pageobjects/loginCredencials.js';
import Engagements from '../pageobjects/engagementResources.js';
import Tasks from '../pageobjects/taskResources.js';

describe('Authentication', () => {
    it('should not update the engagement title without saving', async () => {
        await LoginCredentials.url();
        await LoginCredentials.login(
            process.env.LOGIN_USERNAME,
            process.env.LOGIN_PASSWORD
        );
        await expect(LoginCredentials.loggedIn).toBeDisplayed();
        await Tasks.selectFourteenthCase();
        await Engagements.clickEngagementTab();
        await expect(Engagements.engagementDoc).toBeDisplayed();
        await Engagements.enterNewTitle('Unsaved Title');
        await browser.refresh();
        await Engagements.clickEngagementTab();
        await expect(Engagements.engagementDoc).toBeDisplayed();
    });
});
