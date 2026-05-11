import { expect } from '@wdio/globals';
import LoginCredentials from '../pageobjects/loginCredencials.js';
import Tasks from '../pageobjects/caseTaskResources.js';

describe('Case Tasks', () => {
    it('should edit task fields without saving', async () => {
        // Log in and navigate to the target case
        await LoginCredentials.url();
        await LoginCredentials.login(
            process.env.LOGIN_USERNAME,
            process.env.LOGIN_PASSWORD
        );
        await expect(LoginCredentials.loggedIn).toBeDisplayed();
        await Tasks.goToCase('3dd2a1b9-999d-43f3-a715-3a63c2d21f76');

        // Create a setup task to act on
        const setupTask = `Setup task ${Date.now()}`;
        await Tasks.whenClickable(Tasks.caseAddTaskButton);
        await Tasks.enterTitleText();
        await Tasks.selectAssignTo();
        await Tasks.selectMilestone();
        await Tasks.enterTaskText(setupTask);
        await Tasks.saveTask();
        await Tasks.toastNotification.waitForDisplayed({ timeout: 30000 });
        await Tasks.kebabMenuButton.waitForExist({ timeout: 30000 });

        // Edit all fields but cancel without saving, then verify the cancel button is gone
        await Tasks.editAllFieldsUnsavedCase();
        await expect(Tasks.cancelTaskButton).not.toBeDisplayed();
    });
});
