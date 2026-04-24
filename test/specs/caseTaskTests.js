
import { browser, expect } from '@wdio/globals';
import LoginCredentials from '../pageobjects/loginCredenticals.js';
import Tasks from '../pageobjects/caseTaskResources.js';

describe('Case Task', () => {
    before(async () => {
        await LoginCredentials.url();
        await LoginCredentials.login(
            process.env.LOGIN_USERNAME,
            process.env.LOGIN_PASSWORD
        );
        await expect(LoginCredentials.loggedIn).toBeDisplayed();
    });

    beforeEach(async () => {
        await Tasks.navigateToCasePage();
    });

    it('should add a task, verify it saves, and repeat with billable and due date', async () => {
        const taskDescription = `Case task testing ${Date.now()}`;

        await Tasks.whenClickable(Tasks.caseAddTaskButton);
        await browser.pause(5000);
        await Tasks.selectAssignTo();
        await Tasks.selectMilestone();
        await Tasks.enterTaskText(taskDescription);
        await browser.refresh();

        await Tasks.navigateToCasePage();
        await browser.pause(3000);
        await Tasks.whenClickable(Tasks.caseAddTaskButton);
        await browser.pause(5000);
        await Tasks.selectAssignTo();
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

    it('should edit a task, not save changes, then save changes', async () => {
        await Tasks.editAllFieldsUnsavedCase();
        await Tasks.editAllFieldsCase();
        await browser.pause(2000);
    });

    it('should add notes to a task', async () => {
        await Tasks.addingNotes();
        await browser.pause(3000);
    });

    // it('should complete the bottom task', async () => {
    //     await Tasks.completeTask();
    //     await browser.pause(2000);
    // });

    it('should close the bottom task', async () => {
        await Tasks.closeTask();
        await browser.pause(2000);
    });
}); // caseTaskTests