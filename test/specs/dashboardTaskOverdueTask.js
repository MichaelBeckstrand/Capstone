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
        await expect(LoginCredentials.loggedIn).toBeDisplayed();

        const taskDescription = `Overdue task testing ${Date.now()}`;

        await Tasks.whenClickable(Tasks.addTaskButton);
        await Tasks.selectCase();
        await Tasks.selectMilestone();
        await Tasks.enterTaskText(taskDescription);
        await Tasks.enterPastDueDate();
        await Tasks.saveTask();
        await browser.pause(1000);

        await expect(Tasks.overdueIndicator).toBeDisplayed();
        await LoginCredentials.logout.click();
    });
}); //dashboardTask_overdueTask
