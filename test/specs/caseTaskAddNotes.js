import { browser, expect } from '@wdio/globals';
import LoginCredentials from '../pageobjects/loginCredencials.js';
import Tasks from '../pageobjects/caseTaskResources.js';

describe('Case Task Tests', () => {
     it('should add notes to a task', async () => {
        await LoginCredentials.url();
        await LoginCredentials.login(
            process.env.LOGIN_USERNAME,
            process.env.LOGIN_PASSWORD
        );
        await expect(LoginCredentials.loggedIn).toBeDisplayed();
        await Tasks.navigateToCasePage('https://app.thecasework.com/case/f05c478f-4211-47ad-8ea4-9ebce4f61bdc');

        const setupTask = `Setup task ${Date.now()}`;
        await Tasks.whenClickable(Tasks.caseAddTaskButton);
        await browser.pause(5000);
        await Tasks.selectAssignTo();
        await Tasks.selectMilestone();
        await Tasks.enterTaskText(setupTask);
        await Tasks.saveTask();
        await browser.pause(1000);

        await Tasks.addingNotes();
        await browser.pause(3000);
    });
});
