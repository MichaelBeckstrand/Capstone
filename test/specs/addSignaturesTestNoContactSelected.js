import { browser, expect } from '@wdio/globals';
import LoginCredentials from '../pageobjects/loginCredencials.js';
import Engagements from '../pageobjects/engagementResources.js';
import Tasks from '../pageobjects/caseTaskResources.js';

describe('Engagement Signatures', () => {
    it('should not allow submitting contacts without selecting one', async () => {
        // Log in and verify the user is authenticated
        await LoginCredentials.url();
        await LoginCredentials.login(
            process.env.LOGIN_USERNAME,
            process.env.LOGIN_PASSWORD
        );
        await expect(LoginCredentials.loggedIn).toBeDisplayed();

        // Navigate to the target case and open the Engagement tab
        await Tasks.goToCase('5b1e2961-260a-4b1c-8f66-d7d0257ab0ee');
        await Engagements.clickEngagementTab();

        // Enable the signature checkbox if it is not already checked
        const isChecked = await Engagements.signatureBox.isSelected();
        if (!isChecked) {
            await Engagements.clickSignatureBox();
        }

        // Open the Add Signatory dialog and verify the submit button is disabled with no contact selected
        await Engagements.clickClientAddSignatory();
        await expect(Engagements.selectContactsButton).not.toBeClickable();
        await browser.keys('Escape');
    });
});
