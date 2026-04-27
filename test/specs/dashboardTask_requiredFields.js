import { browser, expect } from '@wdio/globals';
import LoginCredentials from '../pageobjects/loginCredencials.js';
import Tasks from '../pageobjects/taskResources.js';

describe('Add Task', () => {
     it('should not allow saving a task when required fields are missing', async () => {
        await LoginCredentials.url();
        await LoginCredentials.login(
            process.env.LOGIN_USERNAME,
            process.env.LOGIN_PASSWORD
        );
        await expect(LoginCredentials.loggedIn).toBeDisplayed();

        // No fields filled
        await Tasks.whenClickable(Tasks.addTaskButton);
        await browser.pause(5000);
        await expect(Tasks.saveTaskButton).not.toBeClickable();
        await browser.keys('Escape');
        await browser.pause(1000);

        // Only select a case
        await Tasks.whenClickable(Tasks.addTaskButton);
        await browser.pause(5000);
        await Tasks.selectCase();
        await expect(Tasks.saveTaskButton).not.toBeClickable();
        await browser.keys('Escape');
        await browser.pause(500);
        await browser.keys('Escape');
        await browser.pause(1000);

        // Only select a milestone
        await Tasks.whenClickable(Tasks.addTaskButton);
        await browser.pause(5000);
        await Tasks.selectMilestone();
        await expect(Tasks.saveTaskButton).not.toBeClickable();
        await browser.keys('Escape');
        await browser.pause(1000);

        // Only enter text
        await Tasks.whenClickable(Tasks.addTaskButton);
        await browser.pause(5000);
        await Tasks.enterTaskText(`Incomplete task ${Date.now()}`);
        await browser.pause(1000);
        await Tasks.saveTaskButton.waitForClickable({ timeout: 10000 });
        await Tasks.saveTaskButton.click();
        await browser.pause(1000);
        await expect(Tasks.missingRequired).toBeDisplayed();
        await browser.keys('Escape');
        await browser.pause(1000);
    });
}); //dashboardTask_requiredFields
