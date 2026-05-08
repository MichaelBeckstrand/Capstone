import { expect } from '@wdio/globals';
import LoginCredentials from '../pageobjects/loginCredencials.js';
import Tasks from '../pageobjects/taskResources.js'

describe('Dashboard Tasks', () => {
    it('should add a task and save', async () => {
        // Log in and wait for the dashboard task grid to load
        await LoginCredentials.url();
        await LoginCredentials.login(
            process.env.LOGIN_USERNAME,
            process.env.LOGIN_PASSWORD
        );
        await Tasks.findGrid.waitForDisplayed({ timeout: 30000 });

        const taskDescription = `Task description test ${Date.now()}`;

        // Fill in all required task fields and save
        await Tasks.addTaskButton.waitForClickable({ timeout: 30000 });
        await Tasks.whenClickable(Tasks.addTaskButton);
        await Tasks.enterTitleText();
        await Tasks.selectCase();
        await Tasks.enterTaskText(taskDescription);
        await Tasks.selectMilestone();
        await Tasks.saveTask();
        await Tasks.toastNotification.waitForDisplayed({ timeout: 30000 });

        // Wait for the grid to update, then confirm the saved task appears
        await expect(Tasks.saveTaskButton).not.toBeClickable();
        await Tasks.closeTask();


    });
});
