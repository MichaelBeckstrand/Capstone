import { browser, expect } from '@wdio/globals';
import LoginCredentials from '../pageobjects/loginCredencials.js';
import Engagements from '../pageobjects/engagementResources.js';

describe('Engagement Template', () => {
    it('should apply a template, execute and unexecute, and persist engagement text', async () => {
        await LoginCredentials.url();
        await LoginCredentials.login(
            process.env.LOGIN_USERNAME,
            process.env.LOGIN_PASSWORD
        );
        await expect(LoginCredentials.loggedIn).toBeDisplayed();
        await Engagements.selectFourthCase();
        await Engagements.clickEngagementTab();
        await Engagements.ensureUnexecuted();

        // Apply template
        await Engagements.whenClickable(Engagements.applyTemplateButton);
        await Engagements.whenClickable(Engagements.applyTemplate);
        await Engagements.clickSaveButton();
        await browser.pause(2000);

        // Execute then immediately unexecute
        await Engagements.whenClickable(Engagements.previewButton);
        await browser.pause(2000);
        await Engagements.whenClickable(Engagements.executeButton);
        await browser.pause(2000);
        await Engagements.whenClickable(Engagements.confirmExecuteButton);
        await browser.pause(2000);
        await Engagements.ensureUnexecuted();

        // Verify engagement text: unsaved changes don't persist, saved ones do
        await Engagements.whenClickable(Engagements.showfieldsButton);
        const engagementText = `Engagement Text ${Date.now()}`;
        await Engagements.engagementTextRefresh(engagementText);
        await Engagements.savingEngagementText(engagementText);
        await expect(Engagements.engagementTextBox).toHaveValue(engagementText);

        // Cleanup
        await Engagements.whenClickable(Engagements.removeFieldButton);
        await Engagements.clickSaveButton();
        await Engagements.ensureUnexecuted();
    });
});
