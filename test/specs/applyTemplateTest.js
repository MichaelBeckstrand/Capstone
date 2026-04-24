// import { browser, expect } from '@wdio/globals';
// import LoginCredentials from '../pageobjects/loginCredencials.js';
// import Engagements from '../pageobjects/engagementResources.js';

// describe('Authentication', () => {
//     it('should login successfully using environment credentials', async () => {
//         await LoginCredentials.url();
//         await LoginCredentials.login(
//             process.env.LOGIN_USERNAME,
//             process.env.LOGIN_PASSWORD
//         );
//         await expect(LoginCredentials.loggedIn).toBeDisplayed();
//         const engagementText = `Engagement Text ${Date.now()}`;
//         await Engagements.selectCase();
//         await Engagements.clickEngagementTab();
//         await Engagements.whenClickable(Engagements.applyTemplateButton);
//         await browser.pause(2000);
//         await Engagements.whenClickable(Engagements.applyTemplate);
//         await Engagements.clickSaveButton();
//         await browser.pause(2000);
//         await Engagements.whenClickable(Engagements.previewButton);
//         await browser.pause(1000);
//         await Engagements.whenClickable(Engagements.executeButton);
//         await browser.pause(1000);
//         await Engagements.whenClickable(Engagements.confirmExecuteButton);
//         await browser.pause(1000);
//         await Engagements.whenClickable(Engagements.kababUnexecuteMenu);
//         await browser.pause(1000);
//         await Engagements.whenClickable(Engagements.unexecuteButton);
//         await browser.pause(1000);
//         await Engagements.whenClickable(Engagements.showfieldsButton);
//         await Engagements.engagementTextRefresh(engagementText);
//         await Engagements.savingEngagementText(engagementText);
//         await expect(Engagements.engagementTextBox).toHaveValue(engagementText);
//         await Engagements.whenClickable(Engagements.removeFieldButton);
//         await Engagements.clickSaveButton();
//     });
// }); // apply template test 
