import { browser, expect } from '@wdio/globals';
import LoginCredentials from '../pageobjects/loginCredencials.js';
import Tasks from '../pageobjects/taskResources.js';

describe('Add Task', () => {
    it('should add a task, verify it saves, and repeat with billable and due date', async () => {
        await LoginCredentials.url();
        await LoginCredentials.login(
            process.env.LOGIN_USERNAME,
            process.env.LOGIN_PASSWORD
        );
        await expect(LoginCredentials.loggedIn).toBeDisplayed();

        const taskDescription = `Task description test ${Date.now()}`;

        await Tasks.whenClickable(Tasks.addTaskButton);
        await Tasks.selectCase();
        await Tasks.selectMilestone();
        await Tasks.enterTaskText(taskDescription);
        await browser.refresh();

        await Tasks.addTaskButton.waitForClickable({ timeout: 10000 });
        await Tasks.whenClickable(Tasks.addTaskButton);
        await Tasks.selectCase();
        await Tasks.selectMilestone();
        await Tasks.enterTaskText(taskDescription);
        await Tasks.saveTask();
        await browser.pause(1000);

        await expect($(`div=${taskDescription}`)).toBeDisplayed();

        // Additional task with billable/due date
        await Tasks.whenClickable(Tasks.addTaskButton);
        await Tasks.selectCase();
        await Tasks.selectMilestone();
        await Tasks.enterTaskText(taskDescription);
        await Tasks.clickBillable();
        await Tasks.enterDueDate();
        await Tasks.saveTask();
        await browser.pause(1000);
        await LoginCredentials.logout.click();
    });
}); //dashboardTask_addTask
