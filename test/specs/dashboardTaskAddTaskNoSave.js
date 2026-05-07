import { browser, expect } from '@wdio/globals';
import LoginCredentials from '../pageobjects/loginCredencials.js';
import Tasks from '../pageobjects/taskResources.js';

describe('Dashboard Tasks', () => {
    it('should add a task without saving', async () => {
        // Log in and wait for the dashboard task grid to load
        await LoginCredentials.url();
        await LoginCredentials.login(
            process.env.LOGIN_USERNAME,
            process.env.LOGIN_PASSWORD
        );
        await Tasks.findGrid.waitForDisplayed({ timeout: 30000 });

        const taskDescription = `Task description test ${Date.now()}`;

        // Fill in the task form but refresh the page instead of saving
        await Tasks.whenClickable(Tasks.addTaskButton);
        await Tasks.selectCase();
        await Tasks.enterTaskText(taskDescription);
        await Tasks.selectMilestone();
        await browser.refresh();

        // Confirm the unsaved task does not appear in the grid
        await expect(Tasks.taskRow(taskDescription)).not.toBeDisplayed();

    });
});
