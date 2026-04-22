
import { browser, expect } from '@wdio/globals';
import LoginCredentials from '../pageobjects/loginCredenticals.js';
import Engagements from '../pageobjects/engagementsResources.js';
import { Key } from 'webdriverio';

describe('Authentication', () => {
    it('should login successfully using environment credentials', async () => {
        await LoginCredentials.url();
        await LoginCredentials.login(
            process.env.LOGIN_USERNAME, 
            process.env.LOGIN_PASSWORD
        );
 await expect(LoginCredentials.loggedIn).toBeDisplayed();
          await Engagements.selectCase();
          await Engagements.clickEngagementTab();
          await browser.pause(4000);
          await Engagements.applyTemplateButton.click();
            await browser.pause(2000);
            await Engagements.applyTemplate.click();
           await browser.pause(2000);
           await Engagements.clickSaveButton();
           await browser.pause(2000);
           await Engagements.previewButton.click();
           await browser.pause(2000);
           await Engagements.executeButton.click();
           await browser.pause(2000);
           await Engagements.confirmExecuteButton.click();
           await browser.pause(2000);
           await Engagements.kababUnexecuteMenu.click();
           await browser.pause(2000);
           await Engagements.unexecuteButton.click();
              await browser.pause(2000);
              await Engagements.showfieldsButton.click();
              await browser.pause(2000);
              await Engagements.engagementTextRefresh();
              await browser.pause(2000);
              await Engagements.savingEngagementText();
              
               



        

           


    });       
});