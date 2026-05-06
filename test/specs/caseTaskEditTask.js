import { expect } from '@wdio/globals';
import LoginCredentials from '../pageobjects/loginCredencials.js';
import Tasks from '../pageobjects/caseTaskResources.js';

describe('Case Task Tests', () => {
    it('should edit task fields and save', async () => {
        await LoginCredentials.url();
        await LoginCredentials.login(
            process.env.LOGIN_USERNAME,
            process.env.LOGIN_PASSWORD
        );
        await expect(LoginCredentials.loggedIn).toBeDisplayed();
        await Tasks.goToCase('b121cc5d-7310-4147-8bfd-7048a3c16ec3');

        
        const setupTask = `Setup task ${Date.now()}`;
        await Tasks.whenClickable(Tasks.caseAddTaskButton);
        await Tasks.selectAssignTo();
        await Tasks.selectMilestone();
        await Tasks.enterTaskText(setupTask);
        await Tasks.saveTask();
        await Tasks.kebabMenuButton.waitForExist({ timeout: 30000 });
        
        await Tasks.editAllFieldsCase();
        await Tasks.closeTask();
        await expect(Tasks.closeTaskButton).not.toBeDisplayed();
        await expect(Tasks.saveTaskButton).not.toBeClickable();
    });
});
