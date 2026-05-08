import { expect } from '@wdio/globals';
import LoginCredentials from '../pageobjects/loginCredencials.js';
import Tasks from '../pageobjects/caseTaskResources.js';

describe('Case Tasks', () => {
    it('should add a task and save', async () => {
        // Log in and navigate to the target case
        await LoginCredentials.url();
        await LoginCredentials.login(
            process.env.LOGIN_USERNAME,
            process.env.LOGIN_PASSWORD
        );
        await expect(LoginCredentials.loggedIn).toBeDisplayed();
        await Tasks.goToCase('0a535084-088e-4345-9114-c7dc79cc5cfe');

        const taskDescription = `Case task testing ${Date.now()}`;

        // Fill in all required task fields and save
        await Tasks.whenClickable(Tasks.caseAddTaskButton);
        await Tasks.enterTitleText();
        await Tasks.assignUserDropdown.waitForDisplayed({ timeout: 30000 });
        await Tasks.selectAssignTo();
        await Tasks.selectMilestoneDropdown.waitForClickable({ timeout: 30000 });
        await Tasks.selectMilestone();
        await Tasks.enterTaskText(taskDescription);
        await Tasks.saveTask();
        await Tasks.toastNotification.waitForDisplayed({ timeout: 30000 });

        // Close the task panel and verify the new task appears in the task list
        await expect(Tasks.saveTaskButton).not.toBeClickable();
        await Tasks.closeTask();
    });
});
