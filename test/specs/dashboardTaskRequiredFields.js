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
        await $('[role="grid"]').waitForDisplayed({ timeout: 30000 });

        await Tasks.whenClickable(Tasks.addTaskButton);
        await expect(Tasks.saveTaskButton).not.toBeClickable();
        await browser.keys('Escape');

        await Tasks.whenClickable(Tasks.addTaskButton);
        await Tasks.selectCase();
        await expect(Tasks.saveTaskButton).not.toBeClickable();
        await browser.keys('Escape');
        await browser.keys('Escape');

        await Tasks.whenClickable(Tasks.addTaskButton);
        await Tasks.selectMilestoneDashBoard();
        await expect(Tasks.saveTaskButton).not.toBeClickable();
        await browser.keys('Escape');

        await Tasks.whenClickable(Tasks.addTaskButton);
        await Tasks.enterTaskText(`Incomplete task ${Date.now()}`);
        await expect(Tasks.saveTaskButton).not.toBeClickable();
        await browser.keys('Escape');

    });
});
