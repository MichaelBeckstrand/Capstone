
// import { browser, expect } from '@wdio/globals';
// import LoginCredentials from '../pageobjects/loginCredenticals.js';
// import Tasks from '../pageobjects/taskResources.js';

// describe('Add Task', () => {
//     before(async () => {
//         await LoginCredentials.url();
//         await LoginCredentials.login(
//             process.env.LOGIN_USERNAME,
//             process.env.LOGIN_PASSWORD
//         );
//         await expect(LoginCredentials.loggedIn).toBeDisplayed();
//     });

//     beforeEach(async () => {
//         await LoginCredentials.url();
//     });

//     it('should add a task, verify it saves, and repeat with billable and due date', async () => {
//         const taskDescription = `Task description test ${Date.now()}`;

//         await Tasks.whenClickable(Tasks.addTaskButton);
//         await Tasks.selectCase();
//         await Tasks.selectMilestone();
//         await Tasks.enterTaskText(taskDescription);
//         await browser.refresh();

//         await Tasks.addTaskButton.waitForClickable({ timeout: 10000 });
//         await Tasks.whenClickable(Tasks.addTaskButton);
//         await Tasks.selectCase();
//         await Tasks.selectMilestone();
//         await Tasks.enterTaskText(taskDescription);
//         await Tasks.saveTask();
//         await browser.pause(1000);

//         await expect($(`div=${taskDescription}`)).toBeDisplayed();

//         // Additional task with billable/due date
//         await Tasks.whenClickable(Tasks.addTaskButton);
//         await Tasks.selectCase();
//         await Tasks.selectMilestone();
//         await Tasks.enterTaskText(taskDescription);
//         await Tasks.clickBillable();
//         await Tasks.enterDueDate();
//         await Tasks.saveTask();
//         await browser.pause(1000);
//     });

//     it('should edit a task, not save changes, then save changes', async () => {
//         await Tasks.editAllFieldsUnsaved();
//         await Tasks.editAllFields();
//         await browser.pause(2000);
//     });

//     it('should add notes to a task', async () => {
//         await Tasks.addingNotes();
//         await browser.pause(3000);
//     });

//     it('should complete the bottom task', async () => {
//         await Tasks.completeTask();
//         await browser.pause(2000);
//     });

//     it('should close the bottom task', async () => {
//         await Tasks.closeTask();
//         await browser.pause(2000);
//     });

//     it('should input invalid entries into timer add time function', async () => {

//     });

// }); //dashboardTaskTests
