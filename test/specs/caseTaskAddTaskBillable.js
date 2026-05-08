import { expect } from '@wdio/globals';
import LoginCredentials from '../pageobjects/loginCredencials.js';
import Tasks from '../pageobjects/caseTaskResources.js';

describe('Case Tasks', () => {
    it('should add a task with billable and due date', async () => {
        // Log in and navigate to the target case
        await LoginCredentials.url();
        await LoginCredentials.login(
            process.env.LOGIN_USERNAME,
            process.env.LOGIN_PASSWORD
        );
        await expect(LoginCredentials.loggedIn).toBeDisplayed();
        await Tasks.goToCase('7b21f610-32e7-40df-85a9-79a4f2e1ca4f');

        const taskDescription = `Case task testing ${Date.now()}`;

        // Fill in required fields plus the billable flag and a due date, then save
        await Tasks.whenClickable(Tasks.caseAddTaskButton);
        await Tasks.enterTitleText();
        await Tasks.selectAssignTo();
        await Tasks.selectMilestone();
        await Tasks.enterTaskText(taskDescription);
        await Tasks.clickBillable();
        await Tasks.enterDueDate();
        await Tasks.saveTask();

        // Close the task panel and verify it is fully dismissed
        await Tasks.closeTask();
        await expect(Tasks.saveTaskButton).not.toBeDisplayed();
    });
});
