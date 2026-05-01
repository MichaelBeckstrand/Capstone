import { expect } from '@wdio/globals';
import LoginCredentials from '../pageobjects/loginCredencials.js';
import Tasks from '../pageobjects/taskResources.js';

describe('Add Task', () => {
    it('should add a task with billable and due date', async () => {
        await LoginCredentials.url();
        await LoginCredentials.login(
            process.env.LOGIN_USERNAME,
            process.env.LOGIN_PASSWORD
        );
        await $('[role="grid"]').waitForDisplayed({ timeout: 30000 });

        const taskDescription = `Task description test ${Date.now()}`;

        await Tasks.whenClickable(Tasks.addTaskButton);
        await Tasks.selectCase();
        await Tasks.selectMilestone();
        await Tasks.enterTaskText(taskDescription);
        await Tasks.clickBillable();
        await Tasks.enterDueDate();
        await Tasks.saveTask();
        await expect(Tasks.saveTaskButton).not.toBeDisplayed();

    });
});
