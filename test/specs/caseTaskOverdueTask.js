import { expect } from '@wdio/globals';
import LoginCredentials from '../pageobjects/loginCredencials.js';
import Tasks from '../pageobjects/caseTaskResources.js';

describe('Case Tasks', () => {
    it('should add a task with a past due date and detect overdue status', async () => {
        // Log in and navigate to the target case
        await LoginCredentials.url();
        await LoginCredentials.login(
            process.env.LOGIN_USERNAME,
            process.env.LOGIN_PASSWORD
        );
        await expect(LoginCredentials.loggedIn).toBeDisplayed();
        await Tasks.goToCase('4c7b571b-a2f5-4d86-84cb-b8f9dbb671bf');

        const taskDescription = `Overdue task testing ${Date.now()}`;

        // Create a task with a past due date and save
        await Tasks.whenClickable(Tasks.caseAddTaskButton);
        await Tasks.enterTitleText();
        await Tasks.selectAssignTo();
        await Tasks.selectMilestone();
        await Tasks.enterTaskText(taskDescription);
        await Tasks.enterPastDueDate();
        await Tasks.saveTask();

        // Verify the overdue indicator appears, then close the task
        await expect(Tasks.overdueIndicator).toBeDisplayed();
        await Tasks.closeTask();
        await expect(Tasks.saveTaskButton).not.toBeClickable();
    });
});
