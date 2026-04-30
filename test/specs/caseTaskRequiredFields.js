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

        await Tasks.whenClickable(Tasks.caseAddTaskButton);
        await expect(Tasks.saveTaskButton).not.toBeClickable();
        await browser.keys('Escape');

        await Tasks.whenClickable(Tasks.caseAddTaskButton);
        await Tasks.selectAssignTo();
        await expect(Tasks.saveTaskButton).not.toBeClickable();
        await browser.keys('Escape');

        await Tasks.whenClickable(Tasks.caseAddTaskButton);
        await Tasks.selectMilestone();
        await expect(Tasks.saveTaskButton).not.toBeClickable();
        await browser.keys('Escape');

        await Tasks.navigateToCasePage('https://app.thecasework.com/case/28398c10-f24c-4229-8246-d64eb2b1be58');

        await Tasks.whenClickable(Tasks.caseAddTaskButton);
        await Tasks.enterTaskText(`Incomplete task ${Date.now()}`);
        await expect(Tasks.saveTaskButton).not.toBeClickable();
        await browser.keys('Escape');
    });
});
