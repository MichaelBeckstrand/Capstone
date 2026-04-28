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
        await browser.pause(5000);
        await Tasks.selectAssignTo();
        await Tasks.selectMilestone();
        await Tasks.enterTaskText(taskDescription);
        await browser.refresh();

        await Tasks.navigateToCasePage('https://app.thecasework.com/case/0a535084-088e-4345-9114-c7dc79cc5cfe');
        await browser.pause(5000);
        await Tasks.whenClickable(Tasks.caseAddTaskButton);
        await browser.pause(5000);
        await Tasks.selectAssignTo();
        await browser.pause(2000);
        await Tasks.selectMilestone();
        await Tasks.enterTaskText(taskDescription);
        await browser.pause(1000);
        await Tasks.saveTask();
        await browser.pause(1000);

        await expect($(`div=${taskDescription}`)).toBeDisplayed();

        // Additional task with billable/due date
        await Tasks.whenClickable(Tasks.caseAddTaskButton);
        await browser.pause(5000);
        await Tasks.selectAssignTo();
        await Tasks.selectMilestone();
        await Tasks.enterTaskText(taskDescription);
        await Tasks.clickBillable();
        await Tasks.enterDueDate();
        await Tasks.saveTask();
        await browser.pause(1000);
    });
});
