import { expect } from '@wdio/globals';
import LoginCredentials from '../pageobjects/loginCredencials.js';
import Tasks from '../pageobjects/taskResources.js';

describe('Dashboard Tasks', () => {
    it('should add notes to a task', async () => {
        // Log in and wait for the dashboard task grid to load
        await LoginCredentials.url();
        await LoginCredentials.login(
            process.env.LOGIN_USERNAME,
            process.env.LOGIN_PASSWORD
        );
        await Tasks.findGrid.waitForDisplayed({ timeout: 30000 });

        // Create a setup task from the dashboard
        const setupTask = `Setup task ${Date.now()}`;
        await Tasks.whenClickable(Tasks.addTaskButton);
        await Tasks.enterTitleText();
        await Tasks.selectCase();
        await Tasks.enterTaskText(setupTask);
        await Tasks.selectMilestone();
        await Tasks.saveTask();
        await Tasks.toastNotification.waitForDisplayed({ timeout: 30000 });

        // Add notes to the task, then close it and verify the task panel and note button are gone
        await Tasks.addingNotes();
        await Tasks.closeTask();
        await expect(Tasks.addNoteButton).not.toBeClickable();
    });
});
