import { browser, expect } from '@wdio/globals';
import LoginCredentials from '../pageobjects/loginCredencials.js';
import Tasks from '../pageobjects/caseTaskResources.js';

describe('Case Tasks', () => {
    it('should add a task without saving', async () => {
        // Log in and navigate to the target case
        await LoginCredentials.url();
        await LoginCredentials.login(
            process.env.LOGIN_USERNAME,
            process.env.LOGIN_PASSWORD
        );
        await expect(LoginCredentials.loggedIn).toBeDisplayed();
        await Tasks.goToCase('29c3bce5-4977-42ec-8957-a2a7c87fc104');

        const taskDescription = `Case task testing ${Date.now()}`;

        // Fill in the task form but refresh the page instead of saving
        await Tasks.whenClickable(Tasks.caseAddTaskButton);
        await Tasks.enterTitleText();
        await Tasks.selectAssignTo();
        await Tasks.selectMilestone();
        await Tasks.enterTaskText(taskDescription);
        await browser.refresh();

        // Verify the unsaved task does not appear in the task list
        await expect(Tasks.taskRow(taskDescription)).not.toBeDisplayed();
    });
});
