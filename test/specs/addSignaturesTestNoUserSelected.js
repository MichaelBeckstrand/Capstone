import { browser, expect } from '@wdio/globals';
import LoginCredentials from '../pageobjects/loginCredencials.js';
import Engagements from '../pageobjects/engagementResources.js';
import Tasks from '../pageobjects/caseTaskResources.js';

describe('Authentication', () => {
    it('should not allow submitting users without selecting one', async () => {
        await LoginCredentials.url();
        await LoginCredentials.login(
            process.env.LOGIN_USERNAME,
            process.env.LOGIN_PASSWORD
        );
        await expect(LoginCredentials.loggedIn).toBeDisplayed();
        await Tasks.goToCase('96f47b09-3a45-4a13-9f27-83ab113a9550');
        await Engagements.clickEngagementTab();
    

        const isChecked = await Engagements.signatureBox.isSelected();
        if (!isChecked) {
            await Engagements.clickSignatureBox();
        }
        await Engagements.clickMtechAddSignatory();
        await expect(Engagements.selectUsersButton).not.toBeClickable();
        await browser.keys('Escape');
    });
});
