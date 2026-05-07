import { expect } from '@wdio/globals';
import LoginCredentials from '../pageobjects/loginCredencials.js';
import Tasks from '../pageobjects/taskResources.js';

describe('Dashboard Tasks', () => {
    it('should close a task', async () => {
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
        await Tasks.enterTaskText(setupTask);
        await Tasks.selectMilestone();
        await Tasks.saveTask();

        // Wait for the grid to update before interacting with the new row
        await Tasks.taskRow(setupTask).waitForDisplayed({ timeout: 30000 });

        // Close the task and confirm the form is dismissed
        await Tasks.closeTask();
        await expect(Tasks.saveTaskButton).not.toBeDisplayed();


    });
});
