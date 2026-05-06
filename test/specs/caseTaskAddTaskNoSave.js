import { browser, expect } from '@wdio/globals';
import LoginCredentials from '../pageobjects/loginCredencials.js';
import Tasks from '../pageobjects/caseTaskResources.js';

describe('Case Task Tests', () => {
    it('should add a task without saving', async () => {
        await LoginCredentials.url();
        await LoginCredentials.login(
            process.env.LOGIN_USERNAME,
            process.env.LOGIN_PASSWORD
        );
        await expect(LoginCredentials.loggedIn).toBeDisplayed();
        await Tasks.goToCase('29c3bce5-4977-42ec-8957-a2a7c87fc104');

        const taskDescription = `Case task testing ${Date.now()}`;

        await Tasks.whenClickable(Tasks.caseAddTaskButton);
        await Tasks.selectAssignTo();
        await Tasks.selectMilestone();
        await Tasks.enterTaskText(taskDescription);
        await browser.refresh();
        await expect($(`div=${taskDescription}`)).not.toBeDisplayed();

    });
});
