import { expect } from '@wdio/globals';
import LoginCredentials from '../pageobjects/loginCredencials.js';
import Tasks from '../pageobjects/taskResources.js';

describe('Add Task', () => {
    it('should edit task fields and save', async () => {
        await LoginCredentials.url();
        await LoginCredentials.login(
            process.env.LOGIN_USERNAME,
            process.env.LOGIN_PASSWORD
        );
        await Tasks.findGrid.waitForDisplayed({ timeout: 30000 });

        const setupTask = `Setup task ${Date.now()}`;
        await Tasks.whenClickable(Tasks.addTaskButton);
        await Tasks.selectCase();
        await Tasks.enterTaskText(setupTask);
        await Tasks.selectMilestone();
        await Tasks.saveTask();
        await Tasks.editTaskIcon.waitForExist({ timeout: 30000 });

        await Tasks.editAllFieldsDashboard();
        await Tasks.closeTask();
        await expect(Tasks.closeTaskButton).not.toBeDisplayed();
        await expect(Tasks.saveTaskButton).not.toBeClickable();

    });
});
