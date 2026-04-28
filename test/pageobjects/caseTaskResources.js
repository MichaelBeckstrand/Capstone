import { Tasks } from './taskResources.js';
import { Key } from 'webdriverio';

class CaseTasks extends Tasks {

    get caseAddTaskButton() {
        return $('[data-testid="case-tasks-add-task-button"]');
    }

    get selectCaseNewMilestoneDropdown() {
        return $('[role="option"]*=#2 - New Milestone');
    }

    get assignToFirstOption() {
        return $('[role="menuitemradio"]');
    }

    get assignToSecondOption() {
        return $('[data-testid="user-filter-menu-0f9de2be-804b-425c-9602-38b4bac5c9a4-option"]');
    }

    get kebabMenuButton() {
        return $('[aria-label="More items"]');
    }

    get overdueIndicator() {
        return $('span=Overdue');
    }

    get caseAddTimeButton() {
        return $('[data-testid="custom-data-table-context-menu-item-Add Time"]');
    }

    get milestoneFilterButton() {
        return $('span=Milestone');
    }

    async clickKebabMenu() {
        await $('[aria-label="More items"]').waitForExist({ timeout: 10000 });
        await browser.execute(() => {
            const btns = document.querySelectorAll('[aria-label="More items"]');
            if (btns.length > 0) btns[0].click();
        });
        await browser.pause(1500);
    }

    async clickEditIcon() {
        await this.clickKebabMenu();
        await $('[data-testid="custom-data-table-context-menu-item-Edit Task"]').waitForExist({ timeout: 10000 });
        await $('[data-testid="custom-data-table-context-menu-item-Edit Task"]').click();
    }

    async completeTask() {
        await this.milestoneFilterButton.waitForClickable({ timeout: 10000 });
        await this.milestoneFilterButton.click();
        await browser.pause(1000);
        await browser.execute(() => {
            const btns = document.querySelectorAll('[aria-label="More items"]');
            if (btns.length > 0) btns[0].click();
        });
        await browser.pause(1500);
        await $('[data-testid="custom-data-table-context-menu-item-Complete Task"]').waitForExist({ timeout: 10000 });
        await $('[data-testid="custom-data-table-context-menu-item-Complete Task"]').waitForClickable({ timeout: 10000 });
        await $('[data-testid="custom-data-table-context-menu-item-Complete Task"]').click();
        await browser.pause(2000);
    }

    async closeTask() {
        await this.clickKebabMenu();
        await $('[data-testid="custom-data-table-context-menu-item-Close Task"]').waitForExist({ timeout: 10000 });
        await $('[data-testid="custom-data-table-context-menu-item-Close Task"]').click();
        await browser.pause(2000);
    }

    async clickCaseAddTimeButton() {
        await this.clickKebabMenu();
        await this.caseAddTimeButton.waitForExist({ timeout: 10000 });
        await this.caseAddTimeButton.click();
        await browser.pause(1000);
    }

    async selectAssignTo() {
        await this.assignUserDropdown.waitForExist({ timeout: 10000 });
        await this.assignUserDropdown.waitForClickable({ timeout: 10000 });
        await this.assignUserDropdown.click();
        await browser.pause(1000);
        await this.assignToFirstOption.waitForExist({ timeout: 10000 });
        await this.assignToFirstOption.waitForClickable({ timeout: 10000 });
        await this.assignToFirstOption.click();
    }

    async selectSecondAssignTo() {
        await this.assignUserDropdown.waitForExist({ timeout: 10000 });
        await this.assignUserDropdown.waitForClickable({ timeout: 10000 });
        await this.assignUserDropdown.click();
        await browser.pause(1000);
        await this.assignToSecondOption.waitForExist({ timeout: 10000 });
        await this.assignToSecondOption.waitForClickable({ timeout: 10000 });
        await this.assignToSecondOption.click();
    }

    async navigateToCasePage(url = 'https://app.thecasework.com/case/ba3e61e7-8a1e-405b-968f-d201059f4b97') {
        await browser.url(url);
        await $('[data-testid="view-edit-case-tab-case-info"]').waitForClickable({ timeout: 10000 });
        await $('[data-testid="view-edit-case-tab-case-info"]').click();
        await $('span=AUTOTEST_Client').waitForDisplayed({ timeout: 15000 });
        await $('[data-testid="view-edit-case-tab-tasks"]').waitForClickable({ timeout: 10000 });
        await $('[data-testid="view-edit-case-tab-tasks"]').click();
    }

    async selectCaseNewMilestone() {
        browser.execute(() => window.focus());
        await this.whenClickable(this.selectMilestoneDropdown);
        await this.selectMilestoneDropdown.waitForClickable({ timeout: 10000 });
        await this.selectMilestoneDropdown.click();
        await browser.pause(3000);
        await browser.keys(Key.ArrowDown);
        await browser.keys(Key.ArrowDown);
        await browser.keys(Key.Enter);
        await this.taskTextBox.waitForClickable({ timeout: 10000 });
    }

    async editAllFieldsUnsavedCase() {
        await this.clickEditIcon();
        await browser.pause(2000);
        await this.selectSecondAssignTo();
        await browser.pause(2000);
        await this.selectCaseNewMilestone();
        await browser.pause(2000);
        const newTaskDescription = `Updated task description ${Date.now()}`;
        await this.enterTaskText(newTaskDescription);
        await browser.pause(2000);
        await this.enterDueDateConditional();
        await browser.pause(2000);
        await this.cancelEdit();
        await browser.pause(2000);
    }

    async editAllFieldsCase() {
        await this.clickEditIcon();
        await browser.pause(2000);
        await this.selectSecondAssignTo();
        await browser.pause(2000);
        await this.selectCaseNewMilestone();
        await browser.pause(2000);
        const newTaskDescription = `Updated task description ${Date.now()}`;
        await this.enterTaskText(newTaskDescription);
        await browser.pause(2000);
        await this.enterDueDateConditional();
        await browser.pause(2000);
        await this.saveTask();
        await browser.pause(2000);
    }
}

export default new CaseTasks();
