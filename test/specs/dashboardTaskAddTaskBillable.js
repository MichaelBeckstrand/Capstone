import { expect } from '@wdio/globals';
import LoginCredentials from '../pageobjects/loginCredencials.js';
import Tasks from '../pageobjects/taskResources.js';

describe('Dashboard Tasks', () => {
    it('should add a task with billable and due date', async () => {
        // Log in and wait for the dashboard task grid to load
        await LoginCredentials.url();
        await LoginCredentials.login(
            process.env.LOGIN_USERNAME,
            process.env.LOGIN_PASSWORD
        );
        await Tasks.findGrid.waitForDisplayed({ timeout: 30000 });

        const taskDescription = `Task description test ${Date.now()}`;

        // Fill in required fields plus the billable flag and a due date, then save
        await Tasks.whenClickable(Tasks.addTaskButton);
        await Tasks.selectCase();
        await Tasks.enterTaskText(taskDescription);
        await Tasks.clickBillable();
        await Tasks.enterDueDate();
        await Tasks.selectMilestone();
        await Tasks.saveTask();

        // Close the task and confirm the form is dismissed
        await Tasks.closeTask();
        await expect(Tasks.saveTaskButton).not.toBeDisplayed();

    });
});
