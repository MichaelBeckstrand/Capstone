import { expect } from '@wdio/globals';
import LoginCredentials from '../pageobjects/loginCredencials.js';
import Engagements from '../pageobjects/engagementResources.js';
import Tasks from '../pageobjects/caseTaskResources.js';

describe('Authentication', () => {
    it('Should add and delete signatures', async () => {
        await LoginCredentials.url();
        await LoginCredentials.login(
            process.env.LOGIN_USERNAME,
            process.env.LOGIN_PASSWORD
        );
        await LoginCredentials.loggedIn.waitForDisplayed({ timeout: 30000 });
        await Tasks.goToCase('ba3e61e7-8a1e-405b-968f-d201059f4b97');
        await Engagements.clickEngagementTab();
        await (await Engagements.applyTemplateButton).waitForClickable({ timeout: 30000 });

        const isChecked = await Engagements.signatureBox.isSelected();
        if (!isChecked) {
            await Engagements.signatureBox.waitForExist({ timeout: 30000 });
            await Engagements.clickSignatureBox();
        }
        await Engagements.clickMtechAddSignatory();
        await Engagements.addingUserSignature();
        await Engagements.clickClientAddSignatory();
        await Engagements.addingClientSignature();
        await Engagements.saveEngagement();
        await Engagements.deletingMtechSignature();
        await Engagements.deletingClientSignature(); 

        let buttons = await Engagements.signatureDeleteButton;
        while (buttons.length > 1) {
            await buttons[1].click();
            buttons = await Engagements.signatureDeleteButton;
        }
        await Engagements.clickSignatureBox();
        await Engagements.clickSaveButton();
        await Engagements.toastNotification.waitForDisplayed();
        await expect(Engagements.signatureBox).not.toBeSelected();
    });
});
