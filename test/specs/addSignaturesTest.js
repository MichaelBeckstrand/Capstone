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
        await LoginCredentials.loggedIn.waitForDisplayed({ timeout: 10000 });
        await Engagements.selectFirstCase();
        await Engagements.clickEngagementTab();
        await (await Engagements.applyTemplateButton).waitForClickable({ timeout: 10000 });
        await Engagements.ensureUnexecuted({ timeout: 10000 });

        const isChecked = await Engagements.signatureBox.isSelected();
        if (!isChecked) {
            await Engagements.signatureBox.waitForExist({ timeout: 10000 });
            await Engagements.clickSignatureBox({ timeout: 10000 })
            

        }
        await (await Engagements.mtechAddSignatory).waitForClickable({ timeout: 10000 });
        await Engagements.clickMtechAddSignatory();
        await Engagements.addUserSignature.waitForExist({ timeout: 10000 });
        await Engagements.addingUserSignature();
        await (await Engagements.addClientSignatory).waitForClickable({ timeout: 10000 });
        await Engagements.clickClientAddSignatory();
        await Engagements.addClientSignature.waitForExist({ timeout: 10000 });
        await Engagements.addingClientSignature();
        await Engagements.engagementSaveButton.waitForClickable({ timeout: 10000 });
        await Engagements.clickSaveButton();
        await (await Engagements.deleteMtechSignature).waitForClickable({ timeout: 10000 });
        await Engagements.deletingMtechSignature();
        await (await Engagements.deleteClientSignature).waitForClickable({ timeout: 10000 });
        await Engagements.deletingClientSignature();
        

        let buttons = await $$('[data-testid="person-control-delete-button"]');
        while (buttons.length > 1) {
            await buttons[1].click();
            
            buttons = await $$('[data-testid="person-control-delete-button"]');
        }
        await Engagements.clickSignatureBox();
        
        await Engagements.clickSaveButton();
        
        await expect(Engagements.signatureBox).not.toBeSelected();
    });
});
