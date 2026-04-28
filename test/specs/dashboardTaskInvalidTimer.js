import { browser, expect } from '@wdio/globals';
import LoginCredentials from '../pageobjects/loginCredencials.js';
import Tasks from '../pageobjects/taskResources.js';

describe('Add Task', () => {
     it('should input invalid entries into timer add time function', async () => {
        await LoginCredentials.url();
        await LoginCredentials.login(
            process.env.LOGIN_USERNAME,
            process.env.LOGIN_PASSWORD
        );
        await expect(LoginCredentials.loggedIn).toBeDisplayed();

        const setupTask = `Setup task ${Date.now()}`;
        await Tasks.whenClickable(Tasks.addTaskButton);
        await Tasks.selectCase();
        await Tasks.selectMilestone();
        await Tasks.enterTaskText(setupTask);
        await Tasks.saveTask();
        await browser.pause(1000);

        await Tasks.clickAddTimeButton();
        await Tasks.enterHours(999999999);
        await expect(Tasks.submitTimeButton).not.toBeClickable();
        await browser.keys('Escape');
        await browser.pause(1000);

        await Tasks.clickAddTimeButton();
        await Tasks.enterHours('!@#$%^&*');
        await expect(Tasks.submitTimeButton).not.toBeClickable();
        await browser.keys('Escape');
        await browser.pause(1000);

        await Tasks.clickAddTimeButton();
        await Tasks.enterHours('abcdefgh');
        await expect(Tasks.submitTimeButton).not.toBeClickable();
        await browser.keys('Escape');
        await browser.pause(1000);
        await LoginCredentials.logout.click();
    });
}); //dashboardTask_invalidTimer
