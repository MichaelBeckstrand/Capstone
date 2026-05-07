import { expect } from '@wdio/globals';
import LoginCredentials from '../pageobjects/loginCredencials.js';
import Tasks from '../pageobjects/taskResources.js';

describe('Dashboard Tasks', () => {
    it('should add a task with a past due date and detect overdue status', async () => {
        // Log in and wait for the dashboard task grid to load
        await LoginCredentials.url();
        await LoginCredentials.login(
            process.env.LOGIN_USERNAME,
            process.env.LOGIN_PASSWORD
        );
        await Tasks.findGrid.waitForDisplayed({ timeout: 30000 });

        const taskDescription = `Overdue task testing ${Date.now()}`;

        // Create a task with a past due date and save
        await Tasks.whenClickable(Tasks.addTaskButton);
        await Tasks.selectCase();
        await Tasks.enterTaskText(taskDescription);
        await Tasks.enterPastDueDate();
        await Tasks.selectMilestone();
        await Tasks.saveTask();

        // Confirm the overdue indicator is shown, then close the task
        await expect(Tasks.overdueIndicator).toBeDisplayed();
        await Tasks.closeTask();
    });
});
