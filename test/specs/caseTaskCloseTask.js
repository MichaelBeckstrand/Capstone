import { expect } from '@wdio/globals';
import LoginCredentials from '../pageobjects/loginCredencials.js';
import Tasks from '../pageobjects/caseTaskResources.js';

describe('Case Tasks', () => {
    it('should close a task', async () => {
        // Log in and navigate to the target case
        await LoginCredentials.url();
        await LoginCredentials.login(
            process.env.LOGIN_USERNAME,
            process.env.LOGIN_PASSWORD
        );
        await expect(LoginCredentials.loggedIn).toBeDisplayed();
        await Tasks.goToCase('a4430f97-e541-43ac-b9ec-2a5b59103029');

        // Create a setup task to act on
        const setupTask = `Setup task ${Date.now()}`;
        await Tasks.whenClickable(Tasks.caseAddTaskButton);
        await Tasks.enterTitleText();
        await Tasks.selectAssignTo();
        await Tasks.selectMilestone();
        await Tasks.enterTaskText(setupTask);
        await Tasks.saveTask();

        // Close the task and verify the close button is no longer shown
        await Tasks.closeTask();
        await expect(Tasks.closeTaskButton).not.toBeDisplayed();
    });
});
