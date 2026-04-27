import { browser, expect } from '@wdio/globals';
import LoginCredentials from '../pageobjects/loginCredencials.js';
import Tasks from '../pageobjects/taskResources.js';

describe('Add Task', () => {
    it('should edit a task, not save changes, then save changes', async () => {
        await LoginCredentials.url();
        await LoginCredentials.login(
            process.env.LOGIN_USERNAME,
            process.env.LOGIN_PASSWORD
        );
        await expect(LoginCredentials.loggedIn).toBeDisplayed();

        await Tasks.editAllFieldsUnsaved();
        await Tasks.editAllFields();
        await browser.pause(2000);
    });
}); //dashboardTask_editTask
