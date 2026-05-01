import { expect } from '@wdio/globals';
import LoginCredentials from '../pageobjects/loginCredencials.js';
import Tasks from '../pageobjects/caseTaskResources.js';

describe('Case Task Tests', () => {
    it('should close the bottom task', async () => {
        await LoginCredentials.url();
        await LoginCredentials.login(
            process.env.LOGIN_USERNAME,
            process.env.LOGIN_PASSWORD
        );
        await expect(LoginCredentials.loggedIn).toBeDisplayed();
        await Tasks.navigateToCasePage('https://app.thecasework.com/case/a4430f97-e541-43ac-b9ec-2a5b59103029');

        const setupTask = `Setup task ${Date.now()}`;
        await Tasks.whenClickable(Tasks.caseAddTaskButton);
        await Tasks.selectAssignTo();
        await Tasks.selectMilestone();
        await Tasks.enterTaskText(setupTask);
        await Tasks.saveTask();

        await Tasks.closeTask();
        await expect(Tasks.closeTaskButton).not.toBeDisplayed();
    });
});
