import { browser, expect } from '@wdio/globals';
import LoginCredentials from '../pageobjects/loginCredencials.js';
import Tasks from '../pageobjects/caseTaskResources.js';

describe('Case Task Tests', () => {
    it('should add a task without saving', async () => {
        // Login
        await LoginCredentials.url();
        await LoginCredentials.login(
            process.env.LOGIN_USERNAME,
            process.env.LOGIN_PASSWORD
        );
        await expect(LoginCredentials.loggedIn).toBeDisplayed();
        await Tasks.navigateToCasePage('https://app.thecasework.com/case/29c3bce5-4977-42ec-8957-a2a7c87fc104');

        const taskDescription = `Case task testing ${Date.now()}`;

        // Add task without saving
        await Tasks.whenClickable(Tasks.caseAddTaskButton);
        await Tasks.selectAssignTo();
        await Tasks.selectMilestone();   //currently having an issue with milestone dropdown loading  
        await Tasks.enterTaskText(taskDescription);
        await browser.refresh();

        
    });
});
