import { expect } from '@wdio/globals';
import LoginCredentials from '../pageobjects/loginCredencials.js';
import Tasks from '../pageobjects/caseTaskResources.js';

describe('Case Task Tests', () => {
    it('should add a task and save', async () => {

        await LoginCredentials.url();
        await LoginCredentials.login(
            process.env.LOGIN_USERNAME,
            process.env.LOGIN_PASSWORD
        );
        await expect(LoginCredentials.loggedIn).toBeDisplayed();
        await Tasks.selectFifthCase();

        const taskDescription = `Case task testing ${Date.now()}`;


        await Tasks.whenClickable(Tasks.caseAddTaskButton);
        await Tasks.assignUserDropdown.waitForDisplayed({ timeout: 30000 });
        await Tasks.selectAssignTo();
        await Tasks.selectMilestoneDropdown.waitForClickable({ timeout: 30000 });
        await Tasks.selectMilestone();
        await Tasks.enterTaskText(taskDescription);
        await Tasks.saveTask();
        await Tasks.closeTask();
        await expect(Tasks.closeTaskButton).not.toBeDisplayed();
        await expect($(`div=${taskDescription}`)).toBeDisplayed();


    });
});
