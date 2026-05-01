import { browser, expect } from '@wdio/globals';
import LoginCredentials from '../pageobjects/loginCredencials.js';
import Engagements from '../pageobjects/engagementResources.js';
import Tasks from '../pageobjects/taskResources.js';

describe('Engagement Template', () => {
    it('should apply a template, execute and unexecute, and persist engagement text', async () => {
        await LoginCredentials.url();
        await LoginCredentials.login(
            process.env.LOGIN_USERNAME,
            process.env.LOGIN_PASSWORD
        );
        await expect(LoginCredentials.loggedIn).toBeDisplayed();
        await Tasks.selectFourthCase();
        await Engagements.clickEngagementTab();
        await Engagements.ensureUnexecuted();

        await Engagements.whenClickable(Engagements.applyTemplateButton);
        await Engagements.whenClickable(Engagements.applyTemplate);
        await Engagements.clickSaveButton();
        await Engagements.toastNotification.waitForDisplayed({ timeout: 30000 });

        await Engagements.whenClickable(Engagements.previewButton);
        await Engagements.pdf.waitForDisplayed({ timeout: 30000 });
        await Engagements.whenClickable(Engagements.executeButton);
        await Engagements.pdf.waitForDisplayed({ timeout: 30000 });
        await Engagements.whenClickable(Engagements.confirmExecuteButton);
        await Engagements.pdf.waitForDisplayed({ timeout: 30000 });

        await Engagements.ensureUnexecuted();
        await Engagements.whenClickable(Engagements.showfieldsButton);

        const engagementText = `Engagement Text ${Date.now()}`;
        await Engagements.engagementTextRefresh(engagementText);
        await Engagements.savingEngagementText(engagementText);
        await expect(Engagements.engagementTextBox).toHaveValue(engagementText);

        await Engagements.whenClickable(Engagements.removeFieldButton);
        await Engagements.clickSaveButton();
        await Engagements.ensureUnexecuted();
    });
});
