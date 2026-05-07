import { expect } from '@wdio/globals';
import LoginCredentials from '../pageobjects/loginCredencials.js';
import Tasks from '../pageobjects/caseTaskResources.js';

describe('Case Tasks', () => {
    it('should edit task fields and save', async () => {
        // Log in and navigate to the target case
        await LoginCredentials.url();
        await LoginCredentials.login(
            process.env.LOGIN_USERNAME,
            process.env.LOGIN_PASSWORD
        );
        await expect(LoginCredentials.loggedIn).toBeDisplayed();
        await Tasks.goToCase('b121cc5d-7310-4147-8bfd-7048a3c16ec3');

        // Create a setup task to act on
        const setupTask = `Setup task ${Date.now()}`;
        await Tasks.whenClickable(Tasks.caseAddTaskButton);
        await Tasks.selectAssignTo();
        await Tasks.selectMilestone();
        await Tasks.enterTaskText(setupTask);
        await Tasks.saveTask();
        await Tasks.kebabMenuButton.waitForExist({ timeout: 30000 });

        // Edit all fields and save, then close and verify the task panel is fully dismissed
        await Tasks.editAllFieldsCase();
        await Tasks.closeTask();
        await expect(Tasks.saveTaskButton).not.toBeClickable();
    });
});
