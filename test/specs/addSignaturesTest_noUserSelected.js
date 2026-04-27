import { browser, expect } from '@wdio/globals';
import LoginCredentials from '../pageobjects/loginCredencials.js';
import Engagements from '../pageobjects/engagementResources.js';


describe('Authentication', () => {
     it('should not allow submitting users without selecting one', async () => {
        await LoginCredentials.url();
        await LoginCredentials.login(
            process.env.LOGIN_USERNAME,
            process.env.LOGIN_PASSWORD
        );
        await expect(LoginCredentials.loggedIn).toBeDisplayed();
        await Engagements.selectCase();
        await Engagements.clickEngagementTab();
        await browser.pause(4000);
        await Engagements.ensureUnexecuted();

        const isChecked = await Engagements.signatureBox.isSelected();
        if (!isChecked) {
            await Engagements.clickSignatureBox();
            await browser.pause(2000);
        }

        await Engagements.clickMtechAddSignatory();
        await browser.pause(2000);
        await expect(Engagements.selectUsersButton).not.toBeClickable();
        await browser.keys('Escape');
        await browser.pause(1000);
    });
});
