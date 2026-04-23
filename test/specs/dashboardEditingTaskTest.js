
import { browser, expect } from '@wdio/globals';
import LoginCredentials from '../pageobjects/loginCredenticals.js';
import Tasks from '../pageobjects/taskResources.js';


describe('Authentication', () => {
    it('should login successfully using environment credentials', async () => {
        await LoginCredentials.url();
        await LoginCredentials.login(
            process.env.LOGIN_USERNAME, 
            process.env.LOGIN_PASSWORD
        );
 await expect(LoginCredentials.loggedIn).toBeDisplayed();
 await Tasks.clickOnEditTaskIcon();
 await Tasks.editAllFields();
 await browser.pause(5000);
          

    });
});