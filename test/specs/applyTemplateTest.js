// import { browser, expect } from '@wdio/globals';
// import LoginCredentials from '../pageobjects/loginCredenticals.js';
// import Engagements from '../pageobjects/engagementsResources.js';

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
//         await Engagements.whenClickable(Engagements.applyTemplate);
//         await Engagements.clickSaveButton();
//         await browser.pause(2000);
//         await Engagements.whenClickable(Engagements.previewButton);
//         await Engagements.whenClickable(Engagements.executeButton);
//         await Engagements.whenClickable(Engagements.confirmExecuteButton);
//         await Engagements.whenClickable(Engagements.kababUnexecuteMenu);
//         await Engagements.whenClickable(Engagements.unexecuteButton);
//         await Engagements.whenClickable(Engagements.showfieldsButton);
//         await Engagements.engagementTextRefresh(engagementText);
//         await Engagements.savingEngagementText(engagementText);
//         await expect(Engagements.engagementTextBox).toHaveValue(engagementText);
//         await Engagements.resetEngagement();
//     });
// });  