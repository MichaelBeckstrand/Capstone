// import { browser, expect } from '@wdio/globals';
// import LoginCredentials from '../pageobjects/loginCredenticals.js';
// import Tasks from '../pageobjects/taskResources.js';


// describe('Add Task', () => {
//     it('should add a task, verify it saves, and repeat with billable and due date', async () => {
//         await LoginCredentials.url();
//         await LoginCredentials.login(
//             process.env.LOGIN_USERNAME,
//             process.env.LOGIN_PASSWORD
//         );
//         await expect(LoginCredentials.loggedIn).toBeDisplayed();

//         await Tasks.whenClickable(Tasks.addTaskButton);
//         await Tasks.selectCase();
//         await browser.pause(2000);
//         await Tasks.selectMilestone();
//         await browser.pause(2000);
//         const taskDescription = `Task description test ${Date.now()}`;
//         await Tasks.enterTaskText(taskDescription);
//         await browser.pause(2000);
//         await browser.refresh();
//         await browser.pause(2000);
//         await Tasks.whenClickable(Tasks.addTaskButton);
//         await Tasks.selectCase();
//         await browser.pause(2000);
//         await Tasks.selectMilestone();
//         await browser.pause(2000);
//         await Tasks.enterTaskText(taskDescription);
//         await browser.pause(2000);
//         await Tasks.saveTask();
//         await expect($(`div=${taskDescription}`)).toBeDisplayed();
//         await Tasks.whenClickable(Tasks.addTaskButton);
//         await Tasks.selectCase();
//         await browser.pause(2000);
//         await Tasks.selectMilestone();
//         await browser.pause(2000);
//         await Tasks.enterTaskText(taskDescription);
//         await Tasks.clickBillable();
//         await Tasks.enterDueDate();
//         await browser.pause(2000);
//         await Tasks.saveTask();

//      });
// });                   //addTaskTest

