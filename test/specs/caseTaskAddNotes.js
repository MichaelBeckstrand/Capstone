import { expect } from '@wdio/globals';
import LoginCredentials from '../pageobjects/loginCredencials.js';
import Tasks from '../pageobjects/caseTaskResources.js';

describe('Case Tasks', () => {
    it('should add notes to a task', async () => {
        // Log in and navigate to the target case
        await LoginCredentials.url();
        await LoginCredentials.login(
            process.env.LOGIN_USERNAME,
            process.env.LOGIN_PASSWORD
        );
        await expect(LoginCredentials.loggedIn).toBeDisplayed();
        await Tasks.goToCase('f05c478f-4211-47ad-8ea4-9ebce4f61bdc');

        // Create a setup task with assignee and milestone
        const setupTask = `Setup task ${Date.now()}`;
        await Tasks.whenClickable(Tasks.caseAddTaskButton);
        await Tasks.selectAssignTo();
        await Tasks.selectMilestone();
        await Tasks.enterTaskText(setupTask);
        await Tasks.saveTask();
        await Tasks.kebabMenuButton.waitForExist({ timeout: 30000 });

        // Add notes to the task, then close it and verify the task panel and note button are gone
        await Tasks.addingNotes();
        await Tasks.closeTask();
        await expect(Tasks.addNoteButton).not.toBeClickable();
    });
});
