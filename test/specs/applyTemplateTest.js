import { expect } from '@wdio/globals';
import LoginCredentials from '../pageobjects/loginCredencials.js';
import Engagements from '../pageobjects/engagementResources.js';
import Tasks from '../pageobjects/caseTaskResources.js';

describe('Engagement Template', () => {
    it('should apply a template, execute and unexecute, and persist engagement text', async () => {
        // Log in and navigate to the target case's Engagement tab
        await LoginCredentials.url();
        await LoginCredentials.login(
            process.env.LOGIN_USERNAME,
            process.env.LOGIN_PASSWORD
        );
        await expect(LoginCredentials.loggedIn).toBeDisplayed();
        await Tasks.goToCase('d4d945c8-c966-4599-b647-8b9677997d43');
        await Engagements.clickEngagementTab();
        await Engagements.ensureUnexecuted();

        // Apply a template and save
        await Engagements.whenClickable(Engagements.applyTemplateButton);
        await Engagements.whenClickable(Engagements.applyTemplate);
        await Engagements.clickSaveButton();
        await Engagements.toastNotification.waitForDisplayed({ timeout: 30000 });

        // Preview the engagement, then execute and confirm execution
        await Engagements.whenClickable(Engagements.previewButton);
        await Engagements.pdf.waitForDisplayed({ timeout: 30000 });
        await Engagements.whenClickable(Engagements.executeButton);
        await Engagements.pdf.waitForDisplayed({ timeout: 30000 });
        await Engagements.whenClickable(Engagements.confirmExecuteButton);
        await Engagements.pdf.waitForDisplayed({ timeout: 30000 });

        // Unexecute and reveal the engagement fields
        await Engagements.ensureUnexecuted();
        await Engagements.whenClickable(Engagements.showfieldsButton);

        // Enter custom engagement text, save, and verify it persists
        const engagementText = `Engagement Text ${Date.now()}`;
        await Engagements.engagementTextRefresh(engagementText);
        await Engagements.savingEngagementText(engagementText);
        await expect(Engagements.engagementTextBox).toHaveValue(engagementText);

        // Remove the custom field, save, and leave the engagement unexecuted for future runs
        await Engagements.whenClickable(Engagements.removeFieldButton);
        await Engagements.clickSaveButton();
        await Engagements.ensureUnexecuted();
    });
});
