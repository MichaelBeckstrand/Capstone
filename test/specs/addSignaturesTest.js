import { expect } from '@wdio/globals';
import LoginCredentials from '../pageobjects/loginCredencials.js';
import Engagements from '../pageobjects/engagementResources.js';
import Tasks from '../pageobjects/caseTaskResources.js';

describe('Engagement Signatures', () => {
    it('Should add and delete signatures', async () => {
        // Log in and navigate to the target case's Engagement tab
        await LoginCredentials.url();
        await LoginCredentials.login(
            process.env.LOGIN_USERNAME,
            process.env.LOGIN_PASSWORD
        );
        await LoginCredentials.loggedIn.waitForDisplayed({ timeout: 30000 });
        await Tasks.goToCase('ba3e61e7-8a1e-405b-968f-d201059f4b97');
        await Engagements.clickEngagementTab();
        await (await Engagements.applyTemplateButton).waitForClickable({ timeout: 30000 });

        // Enable the signature checkbox if it is not already checked
        const isChecked = await Engagements.signatureBox.isSelected();
        if (!isChecked) {
            await Engagements.signatureBox.waitForExist({ timeout: 30000 });
            await Engagements.clickSignatureBox();
        }

        // Add an MTech signatory and a client signatory, then save the engagement
        await Engagements.clickMtechAddSignatory();
        await Engagements.addingUserSignature();
        await Engagements.clickClientAddSignatory();
        await Engagements.addingClientSignature();
        await Engagements.saveEngagement();

        // Delete both signatories and clear any remaining extras
        await Engagements.deletingMtechSignature();
        await Engagements.deletingClientSignature();

        let buttons = await Engagements.signatureDeleteButton;
        while (buttons.length > 1) {
            await buttons[1].click();
            buttons = await Engagements.signatureDeleteButton;
        }

        // Uncheck the signature box, save, and verify the box is deselected
        await Engagements.clickSignatureBox();
        await Engagements.clickSaveButton();
        await Engagements.toastNotification.waitForDisplayed();
        await expect(Engagements.signatureBox).not.toBeSelected();
    });
});
