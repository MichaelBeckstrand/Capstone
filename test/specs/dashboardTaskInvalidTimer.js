import { browser, expect } from '@wdio/globals';
import LoginCredentials from '../pageobjects/loginCredencials.js';
import Tasks from '../pageobjects/taskResources.js';

describe('Dashboard Tasks', () => {
    it('should input invalid entries into timer add time function', async () => {
        // Log in and wait for the dashboard task grid to load
        await LoginCredentials.url();
        await LoginCredentials.login(
            process.env.LOGIN_USERNAME,
            process.env.LOGIN_PASSWORD
        );
        await Tasks.findGrid.waitForDisplayed({ timeout: 30000 });

        // Create a setup task to act on
        const setupTask = `Setup task ${Date.now()}`;
        await Tasks.whenClickable(Tasks.addTaskButton);
        await Tasks.selectCase();
        await Tasks.selectMilestone();
        await Tasks.enterTaskText(setupTask);
        await Tasks.saveTask();

        // Verify an excessively large number is rejected
        await Tasks.clickAddTimeButton();
        await Tasks.enterHours(999999999);
        await expect(Tasks.submitTimeButton).not.toBeClickable();
        await browser.keys('Escape');

        // Verify special characters are rejected
        await Tasks.clickAddTimeButton();
        await Tasks.enterHours('!@#$%^&*');
        await expect(Tasks.submitTimeButton).not.toBeClickable();
        await browser.keys('Escape');

        // Verify alphabetic input is rejected
        await Tasks.clickAddTimeButton();
        await Tasks.enterHours('abcdefgh');
        await expect(Tasks.submitTimeButton).not.toBeClickable();
        await browser.keys('Escape');
        await Tasks.closeTask();

    });
});
