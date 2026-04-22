
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
//           await expect(Engagements.engagementDoc).toBeDisplayed();
//           const title = `Updated Title ${Date.now()}`;
//           await Engagements.enterNewTitle(title);
//           await Engagements.saveEngagement();
          
//           await Engagements.enterNewTitle('Unsaved Title');
//           await browser.refresh();
//           await Engagements.clickEngagementTab();
//           await expect(Engagements.engagementDoc).toBeDisplayed();

//     });       //updating title test 
// });