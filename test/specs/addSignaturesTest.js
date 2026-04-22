
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
//  await expect(LoginCredentials.loggedIn).toBeDisplayed();
//           await Engagements.selectCase();
//           await Engagements.clickEngagementTab();
//           await browser.pause(4000);
//           await Engagements.clickSignatureBox();
//           await browser.pause(2000);
//           await Engagements.clickMtechAddSignatory();
//           await browser.pause(2000);
//           await Engagements.addingUserSignature();
//           await browser.pause(2000);
//           await Engagements.clickClientAddSignatory();
//           await browser.pause(2000);
//           await Engagements.addingClientSignature();
//           await browser.pause(2000);
//           await Engagements.clickSaveButton();
//           await browser.pause(2000);
//           await Engagements.deletingMtechSignature();
//           await browser.pause(5000);   
//           await Engagements.deletingClientSignature();
//           await browser.pause(5000);

//     });
// });             