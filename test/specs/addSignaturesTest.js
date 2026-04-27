import { browser, expect } from '@wdio/globals';
import LoginCredentials from '../pageobjects/loginCredencials.js';
import Engagements from '../pageobjects/engagementResources.js';


describe('Authentication', () => {
    it('Should add and delete signatures', async () => {
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
            await Engagements.clickSaveButton();
            await browser.pause(2000);
        }
        await browser.pause(2000);
        await Engagements.clickMtechAddSignatory();
        await browser.pause(4000);
        await Engagements.addingUserSignature();
        await browser.pause(2000);
        await Engagements.clickClientAddSignatory();
        await browser.pause(4000);
        await Engagements.addingClientSignature();
        await browser.pause(2000);
        await Engagements.clickSaveButton();
        await browser.pause(2000);
        await Engagements.deletingMtechSignature();
        await browser.pause(5000);
        await Engagements.deletingClientSignature();
        await browser.pause(5000);

        let buttons = await $$('[data-testid="person-control-delete-button"]');
        while (buttons.length > 1) {
            await buttons[1].click();
            await browser.pause(2000);
            buttons = await $$('[data-testid="person-control-delete-button"]');
        }
        await Engagements.clickSignatureBox();
        await browser.pause(2000);
        await Engagements.clickSaveButton();
        await browser.pause(2000);
        await expect(Engagements.signatureBox).not.toBeSelected();
    });
});
