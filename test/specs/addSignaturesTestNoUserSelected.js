import { browser, expect } from '@wdio/globals';
import LoginCredentials from '../pageobjects/loginCredencials.js';
import Engagements from '../pageobjects/engagementResources.js';
import Tasks from '../pageobjects/taskResources.js';

describe('Authentication', () => {
    it('should not allow submitting users without selecting one', async () => {
        await LoginCredentials.url();
        await LoginCredentials.login(
            process.env.LOGIN_USERNAME,
            process.env.LOGIN_PASSWORD
        );
        await expect(LoginCredentials.loggedIn).toBeDisplayed();
        await Tasks.selectThirdCase();
        await Engagements.clickEngagementTab();
        await Engagements.ensureUnexecuted();

        const isChecked = await Engagements.signatureBox.isSelected();
        if (!isChecked) {
            await Engagements.clickSignatureBox();
        }
        await Engagements.clickMtechAddSignatory();
        await expect(Engagements.selectUsersButton).not.toBeClickable();
        await browser.keys('Escape');
    });
});
