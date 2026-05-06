import { browser, expect } from '@wdio/globals';
import LoginCredentials from '../pageobjects/loginCredencials.js';
import Engagements from '../pageobjects/engagementResources.js';
import Tasks from '../pageobjects/caseTaskResources.js';

describe('Authentication', () => {
    it('should not allow submitting contacts without selecting one', async () => {
        await LoginCredentials.url();
        await LoginCredentials.login(
            process.env.LOGIN_USERNAME,
            process.env.LOGIN_PASSWORD
        );
        await expect(LoginCredentials.loggedIn).toBeDisplayed();
        await Tasks.goToCase('5b1e2961-260a-4b1c-8f66-d7d0257ab0ee');
        await Engagements.clickEngagementTab();

        const isChecked = await Engagements.signatureBox.isSelected();
        if (!isChecked) {
            await Engagements.clickSignatureBox();
        }
        await Engagements.clickClientAddSignatory();
        await expect(Engagements.selectContactsButton).not.toBeClickable();
        await browser.keys('Escape');
    });
});
