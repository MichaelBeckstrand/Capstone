import { browser, expect } from '@wdio/globals';
import LoginCredentials from '../pageobjects/loginCredencials.js';
import Tasks from '../pageobjects/caseTaskResources.js';

describe('Case Tasks', () => {
    it('should not allow saving a task when required fields are missing', async () => {
        // Log in and navigate to the target case
        await LoginCredentials.url();
        await LoginCredentials.login(
            process.env.LOGIN_USERNAME,
            process.env.LOGIN_PASSWORD
        );
        await expect(LoginCredentials.loggedIn).toBeDisplayed();
        await Tasks.goToCase('28398c10-f24c-4229-8246-d64eb2b1be58');

        // Verify save is disabled with no fields filled in
        await Tasks.whenClickable(Tasks.caseAddTaskButton);
        await expect(Tasks.saveTaskButton).not.toBeClickable();
        await browser.keys('Escape');

        // Verify save is disabled with only assignee selected
        await Tasks.whenClickable(Tasks.caseAddTaskButton);
        await Tasks.selectAssignTo();
        await expect(Tasks.saveTaskButton).not.toBeClickable();
        await browser.keys('Escape');

        // Verify save is disabled with only milestone selected
        await Tasks.whenClickable(Tasks.caseAddTaskButton);
        await Tasks.selectMilestone();
        await expect(Tasks.saveTaskButton).not.toBeClickable();
        await browser.keys('Escape');

        await Tasks.goToCase('28398c10-f24c-4229-8246-d64eb2b1be58');

        // Verify save is disabled with only task text entered
        await Tasks.whenClickable(Tasks.caseAddTaskButton);
        await Tasks.enterTaskText(`Incomplete task ${Date.now()}`);
        await expect(Tasks.saveTaskButton).not.toBeClickable();
        await browser.keys('Escape');
    });
});
