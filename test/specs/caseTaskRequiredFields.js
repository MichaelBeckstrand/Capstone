import { browser, expect } from '@wdio/globals';
import LoginCredentials from '../pageobjects/loginCredencials.js';
import Tasks from '../pageobjects/caseTaskResources.js';

describe('Case Task Tests', () => {
    it('should not allow saving a task when required fields are missing', async () => {
        await LoginCredentials.url();
        await LoginCredentials.login(
            process.env.LOGIN_USERNAME,
            process.env.LOGIN_PASSWORD
        );
        await expect(LoginCredentials.loggedIn).toBeDisplayed();
        await Tasks.navigateToCasePage('https://app.thecasework.com/case/28398c10-f24c-4229-8246-d64eb2b1be58');

        // No fields filled
        await Tasks.whenClickable(Tasks.caseAddTaskButton);
        await browser.pause(5000);
        await expect(Tasks.saveTaskButton).not.toBeClickable();
        await browser.keys('Escape');
        await browser.pause(1000);

        // Only assign a user
        await Tasks.whenClickable(Tasks.caseAddTaskButton);
        await browser.pause(5000);
        await Tasks.selectAssignTo();
        await expect(Tasks.saveTaskButton).not.toBeClickable();
        await browser.keys('Escape');
        await browser.pause(1000);

        // Only select a milestone
        await Tasks.whenClickable(Tasks.caseAddTaskButton);
        await browser.pause(5000);
        await Tasks.selectMilestone();
        await expect(Tasks.saveTaskButton).not.toBeClickable();
        await browser.keys('Escape');
        await browser.pause(1000);

        // Re-navigate to clear pre-filled milestone state left by previous step
        await Tasks.navigateToCasePage('https://app.thecasework.com/case/28398c10-f24c-4229-8246-d64eb2b1be58');

        // Only enter text
        await Tasks.whenClickable(Tasks.caseAddTaskButton);
        await browser.pause(5000);
        await Tasks.enterTaskText(`Incomplete task ${Date.now()}`);
        await browser.pause(1000);
        await expect(Tasks.saveTaskButton).not.toBeClickable();
        await browser.keys('Escape');
        await browser.pause(1000);
    });
});
