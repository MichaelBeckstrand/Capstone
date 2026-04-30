import { browser, expect } from '@wdio/globals';
import LoginCredentials from '../pageobjects/loginCredencials.js';
import Tasks from '../pageobjects/caseTaskResources.js';

describe('Case Task Tests', () => {
    it('should input invalid entries into timer add time function', async () => {
        await LoginCredentials.url();
        await LoginCredentials.login(
            process.env.LOGIN_USERNAME,
            process.env.LOGIN_PASSWORD
        );
        await expect(LoginCredentials.loggedIn).toBeDisplayed();
        await Tasks.navigateToCasePage('https://app.thecasework.com/case/6395222e-d225-492f-a6a3-7f0e021d1f3b');

        const setupTask = `Setup task ${Date.now()}`;
        await Tasks.whenClickable(Tasks.caseAddTaskButton);
        await Tasks.selectAssignTo();
        await Tasks.selectMilestone();
        await Tasks.enterTaskText(setupTask);
        await Tasks.saveTask();

        await Tasks.clickCaseAddTimeButton();
        await Tasks.enterHours(999999999);
        await expect(Tasks.submitTimeButton).not.toBeClickable();
        await browser.keys('Escape');

        await Tasks.clickCaseAddTimeButton();
        await Tasks.enterHours('!@#$%^&*');
        await expect(Tasks.submitTimeButton).not.toBeClickable();
        await browser.keys('Escape');

        await Tasks.clickCaseAddTimeButton();
        await Tasks.enterHours('abcdefgh');
        await expect(Tasks.submitTimeButton).not.toBeClickable();
        await browser.keys('Escape');
    });
});
