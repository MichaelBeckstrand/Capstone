import { expect } from '@wdio/globals';
import LoginCredentials from '../pageobjects/loginCredencials.js';
import Engagements from '../pageobjects/engagementResources.js';

describe('Authentication', () => {
    it('should update the engagement title', async () => {
        await LoginCredentials.url();
        await LoginCredentials.login(
            process.env.LOGIN_USERNAME,
            process.env.LOGIN_PASSWORD
        );
        await expect(LoginCredentials.loggedIn).toBeDisplayed();
        await Engagements.selectThirteenthCase();
        await Engagements.clickEngagementTab();
        await expect(Engagements.engagementDoc).toBeDisplayed();
        await Engagements.ensureUnexecuted();
        const title = `Updated Title ${Date.now()}`;
        await Engagements.enterNewTitle(title);
        await Engagements.saveEngagement();
        await expect(Engagements.engagementSaveButton).not.toBeDisplayed()
    });
});
