import { browser, expect } from '@wdio/globals';
import LoginCredentials from '../pageobjects/loginCredencials.js';
import Tasks from '../pageobjects/taskResources.js';

describe('Dashboard Tasks', () => {
    it('should not allow saving a task when required fields are missing', async () => {
        // Log in and wait for the dashboard task grid to load
        await LoginCredentials.url();
        await LoginCredentials.login(
            process.env.LOGIN_USERNAME,
            process.env.LOGIN_PASSWORD
        );
        await Tasks.findGrid.waitForDisplayed({ timeout: 30000 });

        // Verify save is disabled with no fields filled in
        await Tasks.whenClickable(Tasks.addTaskButton);
        await expect(Tasks.saveTaskButton).not.toBeClickable();
        await browser.keys('Escape');

        // Verify save is disabled with only a case selected
        await Tasks.whenClickable(Tasks.addTaskButton);
        await Tasks.selectCase();
        await expect(Tasks.saveTaskButton).not.toBeClickable();
        await browser.keys('Escape');
        await browser.keys('Escape');

        // Verify save is disabled with only a milestone selected
        await Tasks.whenClickable(Tasks.addTaskButton);
        await Tasks.selectMilestoneDashBoard();
        await expect(Tasks.saveTaskButton).not.toBeClickable();
        await browser.keys('Escape');
        await browser.keys('Escape');

        // Verify save is disabled with only task text entered
        await Tasks.whenClickable(Tasks.addTaskButton);
        await Tasks.enterTaskText(`Incomplete task ${Date.now()}`);
        await expect(Tasks.saveTaskButton).not.toBeClickable();
        await browser.keys('Escape');

    });
});
