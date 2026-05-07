import { browser, expect } from '@wdio/globals';
import LoginCredentials from '../pageobjects/loginCredencials.js';
import Engagements from '../pageobjects/engagementResources.js';
import Tasks from '../pageobjects/caseTaskResources.js';

describe('Engagement Signatures', () => {
    it('should not allow submitting users without selecting one', async () => {
        // Log in and verify the user is authenticated
        await LoginCredentials.url();
        await LoginCredentials.login(
            process.env.LOGIN_USERNAME,
            process.env.LOGIN_PASSWORD
        );
        await expect(LoginCredentials.loggedIn).toBeDisplayed();

        // Navigate to the target case and open the Engagement tab
        await Tasks.goToCase('96f47b09-3a45-4a13-9f27-83ab113a9550');
        await Engagements.clickEngagementTab();

        // Enable the signature checkbox if it is not already checked
        const isChecked = await Engagements.signatureBox.isSelected();
        if (!isChecked) {
            await Engagements.clickSignatureBox();
        }

        // Open the Add MTech Signatory dialog and verify the submit button is disabled with no user selected
        await Engagements.clickMtechAddSignatory();
        await expect(Engagements.selectUsersButton).not.toBeClickable();
        await browser.keys('Escape');
    });
});
