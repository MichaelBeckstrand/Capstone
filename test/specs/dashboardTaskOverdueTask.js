import { browser, expect } from '@wdio/globals';
import LoginCredentials from '../pageobjects/loginCredencials.js';
import Tasks from '../pageobjects/taskResources.js';

describe('Add Task', () => {
    it('should add a task with a past due date and detect overdue status', async () => {
        await LoginCredentials.url();
        await LoginCredentials.login(
            process.env.LOGIN_USERNAME,
            process.env.LOGIN_PASSWORD
        );
        await $('[role="grid"]').waitForDisplayed({ timeout: 30000 });

        const taskDescription = `Overdue task testing ${Date.now()}`;

        await Tasks.whenClickable(Tasks.addTaskButton);
        await Tasks.selectCase();
        await Tasks.enterTaskText(taskDescription);
        await Tasks.enterPastDueDate();
        await Tasks.selectMilestone();
        await Tasks.saveTask();

        await expect(Tasks.overdueIndicator).toBeDisplayed();
    });
});
