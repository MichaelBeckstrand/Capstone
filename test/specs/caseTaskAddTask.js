import { browser, expect } from '@wdio/globals';
import LoginCredentials from '../pageobjects/loginCredencials.js';
import Tasks from '../pageobjects/caseTaskResources.js';

describe('Case Task Tests', () => {
    it('should add a task, verify it saves, and repeat with billable and due date', async () => {
        await LoginCredentials.url();
        await LoginCredentials.login(
            process.env.LOGIN_USERNAME,
            process.env.LOGIN_PASSWORD
        );
        await expect(LoginCredentials.loggedIn).toBeDisplayed();
        await Tasks.navigateToCasePage('https://app.thecasework.com/case/0a535084-088e-4345-9114-c7dc79cc5cfe');

        const taskDescription = `Case task testing ${Date.now()}`;

        await Tasks.whenClickable(Tasks.caseAddTaskButton);
        await Tasks.selectAssignTo();
        await Tasks.selectMilestone();
        await Tasks.enterTaskText(taskDescription);
        await browser.refresh();

        await Tasks.navigateToCasePage('https://app.thecasework.com/case/0a535084-088e-4345-9114-c7dc79cc5cfe');
        await Tasks.whenClickable(Tasks.caseAddTaskButton);
        await Tasks.assignUserDropdown.waitForDisplayed({ timeout: 20000 });
        await Tasks.selectAssignTo();
        await Tasks.selectMilestoneDropdown.waitForClickable({ timeout: 20000 });
        await Tasks.selectMilestone();
        await Tasks.enterTaskText(taskDescription);
        await Tasks.saveTask();

        await expect($(`div=${taskDescription}`)).toBeDisplayed();

        // Additional task with billable/due date
        await Tasks.navigateToCasePage('https://app.thecasework.com/case/0a535084-088e-4345-9114-c7dc79cc5cfe');
        await Tasks.whenClickable(Tasks.caseAddTaskButton);
        await Tasks.selectAssignTo();
        await Tasks.selectMilestone();
        await Tasks.enterTaskText(taskDescription);
        await Tasks.clickBillable();
        await Tasks.enterDueDate();
        await Tasks.saveTask();
    });
});
